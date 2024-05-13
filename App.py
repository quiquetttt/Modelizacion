from fastapi import FastAPI
from algoritmo import *
from pydantic import BaseModel
from typing import List, Dict, Any, Tuple
import networkx as nx



app = FastAPI()
    
class inputCrear(BaseModel):
    hab : int
    height : int
    precio : int

class outputCrear(BaseModel):
    lNodos: List[Tuple[int,Dict[str,Any]]]
    lAristas: List[Tuple[int,int]]
    nodo : int
    heiht : int
    jugador : int
    precios : List[int]

class inputDecision(BaseModel):
    lNodos: List[Tuple[int,Dict[str,Any]]]
    lAristas: List[Tuple[int,int]]
    nodo : int
    height: int
    alt : int
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
    G = construccionTriangulo(input_crear.alt-2,input_crear.precio)
    centro = sacarCentro(G)
    nodo = centro[0]
    jugador = (G.nodes[centro[0]]["jugador"])
    lNodos = list(G.nodes(data=True))
    lAristas = list(G.edges)
    precios = G.nodes[centro[0]]["precio"]
    output_crear = outputCrear(lNodos= lNodos, lAristas=lAristas,  nodo=nodo,jugador=jugador, precios=precios)
    return output_crear

@app.post('/Decision/')
def decision(input_decision : inputDecision):
    G = nx.Graph()
    G.add_nodes_from(input_decision.lNodos)
    G.add_edges_from(input_decision.lAristas)
    G.graph["altura"] = input_decision.height
    centro = sacarCentro(G)
    lNodos = list(G.nodes(data=True))
    lAristas = list(G.edges)
    G.nodes[centro[input_decision.nodo]]["decision"] = input_decision.decision
    nodo = input_decision.nodo +1
    jugador = G.nodes[centro[nodo]]["jugador"]
    precios = G.nodes[centro[nodo]]["precio"]
    preTriangulo = trianguloPerfecto(G,nodo)
    nombre1 = getJugador(G,preTriangulo[0])
    habitacion1 = getDecision(G,preTriangulo[0])
    precio1 = getPrecio(G,preTriangulo[0])[habitacion1-1]
    nombre2 = getJugador(G,preTriangulo[1])
    habitacion2 = getDecision(G,preTriangulo[1])
    precio2 = getPrecio(G,preTriangulo[1])[habitacion2-1] 
    nombre3 = getJugador(G,preTriangulo[2])
    habitacion3 = getDecision(G,preTriangulo[2])
    precio3 = getPrecio(G,preTriangulo[2])[habitacion3-1]       
    triangulo = [{'jugador':jugador1,'precio':precio1 , 'habitacion':habitacion1}, {'jugador':jugador2,'precio':precio2 , 'habitacion':habitacion2},{'jugador':jugador3,'precio':precio3 , 'habitacion':habitacion3}]
    output_crear = outputCrear(lNodos= lNodos, lAristas=lAristas,  nodo=0,jugador=jugador, precios=precios,final=triangulo)