from fastapi import FastAPI
import algoritmo as a
from pydantic import BaseModel
from typing import List, Dict, Any, Tuple
import networkx as nx
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # o ["*"] para permitir desde cualquier origen
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

class inputCrear(BaseModel):
    hab : int
    height : int
    precio : int

class outputCrear(BaseModel):
    lNodos: List[Tuple[int,Dict[str,Any]]]
    lAristas: List[Tuple[int,int]]
    nodo : int
    height : int
    jugador : int
    precios : List[int]

class inputDecision(BaseModel):
    lNodos: List[Tuple[int,Dict[str,Any]]]
    lAristas: List[Tuple[int,int]]
    nodo : int
    height: int
    decision: int

class outputDecision(BaseModel):
    lNodos: List[Tuple[int,Dict[str,Any]]]
    lAristas: List[Tuple[int,int]]
    nodo : int   
    height : int 
    jugador : int
    precios : List[int]
    final : List[Dict[str,Any]]

@app.post('/Crear/')
def crear(input_crear : inputCrear ):
    G = a.construccionTriangulo(input_crear.height-2,input_crear.precio)
    centro = a.sacarCentro(G)
    nodo = centro[0]
    jugador = (G.nodes[centro[0]]["jugador"])
    lNodos = list(G.nodes(data=True))
    lAristas = list(G.edges)
    precios = G.nodes[centro[0]]["precio"]
    output_crear = outputCrear(lNodos= lNodos, lAristas=lAristas,  nodo=0,height=input_crear.height,jugador=jugador, precios=precios)
    return output_crear

@app.post('/Decision/')
def decision(input_decision : inputDecision):
    G = nx.Graph()
    G.add_nodes_from(input_decision.lNodos)
    G.add_edges_from(input_decision.lAristas)
    G.graph["altura"] = input_decision.height
    centro = a.sacarCentro(G)
    lNodos = list(G.nodes(data=True))
    lAristas = list(G.edges)
    nodo = centro[input_decision.nodo ]
    G.nodes[nodo]["decision"] = input_decision.decision +1
    preTriangulo = a.trianguloPerfecto(G,nodo)
    print(preTriangulo)
    if preTriangulo is not None:
        jugador1 = a.getJugador(G,preTriangulo[0])
        habitacion1 = a.getDecision(G,preTriangulo[0]) -1
        precio1 = media(a.getPrecio(G,preTriangulo[0])[habitacion1],a.getPrecio(G,preTriangulo[1])[habitacion1],a.getPrecio(G,preTriangulo[2])[habitacion1])
        jugador2 = a.getJugador(G,preTriangulo[1])
        habitacion2 = a.getDecision(G,preTriangulo[1])-1
        precio2 = media(a.getPrecio(G,preTriangulo[0])[habitacion2],a.getPrecio(G,preTriangulo[1])[habitacion2],a.getPrecio(G,preTriangulo[2])[habitacion2])
        jugador3 = a.getJugador(G,preTriangulo[2])
        habitacion3 = a.getDecision(G,preTriangulo[2]) -1
        precio3 = media(a.getPrecio(G,preTriangulo[0])[habitacion3],a.getPrecio(G,preTriangulo[1])[habitacion3],a.getPrecio(G,preTriangulo[2])[habitacion3])      
        triangulo = [{'jugador':jugador1,'precio':precio1 , 'habitacion':habitacion1}, {'jugador':jugador2,'precio':precio2 , 'habitacion':habitacion2},{'jugador':jugador3,'precio':precio3 , 'habitacion':habitacion3}]
        jugador = -1
        precios = []
    else:
        nodo =  centro[input_decision.nodo+1]
        jugador = G.nodes[nodo]["jugador"]
        precios = G.nodes[nodo]["precio"]
        triangulo = [{'jugador':-1}]
    output_decision = outputDecision(lNodos= lNodos, lAristas=lAristas,  nodo=input_decision.nodo+1,height= input_decision.height,jugador=jugador, precios=precios,final=triangulo)
    return output_decision

def media(x: int, y: int, z: int) -> float:
    return round((x + y + z) / 3,2)