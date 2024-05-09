from fastapi import FastAPI
from algoritmo import *
from pydantic import BaseModel
from typing import List, Dict, Any, Tuple
import networkx as nx



app = FastAPI()
    
class inputCrear(BaseModel):
    hab : int
    alt : int
    precio : int

class outputCrear(BaseModel):
    lNodos: List[Tuple[int,Dict[str,Any]]]
    lAristas: List[Tuple[int,int]]
    nodo : int
    jugador : int
    precios : List[int]

class inputDecision(BaseModel):
    lNodos: List[Tuple[int,Dict[str,Any]]]
    lAristas: List[Tuple[int,int]]
    nodo : int
    decision: int

class outputDecision(BaseModel):
    lNodos: List[Tuple[int,Dict[str,Any]]]
    lAristas: List[Tuple[int,int]]
    nodo : int   
    jugador : int
    precios : List[int]
    final : bool

@app.post('/Crear')
def crear(input_crear : inputCrear ):
    G = construccionTriangulo(input_crear.alt-2,input_crear.precio)
    centro = sacarCentro(G)
    jugador = (G.nodes[centro[0]]["jugador"])
    lNodos = list(G.nodes(data=True))
    lAristas = list(G.edges)
    precios = G.nodes[centro[0]]["precio"]
    output_crear = outputCrear(lNodos= lNodos, lAristas=lAristas,  nodo=0,jugador=jugador, precios=precios)
    return output_crear

@app.post('/Decision')
def decision(input_decision : inputDecision):
    G = nx.Graph()
    G.add_nodes_from(input_decision.lNodos)
    G.add_edges_from(input_decision.lAristas)
    centro = sacarCentro(G)
    G.nodes[centro[input_decision.nodo]]["decision"] = input_decision.decision
    nodo = input_decision.nodo +1
    jugador = G.nodes[centro[nodo]]["jugador"]
    precios = G.nodes[centro[nodo]]["precio"]