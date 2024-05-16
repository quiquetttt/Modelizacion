import networkx as nx
from random import randint

def trianguloPerfecto(G,nodo):
    capa = G.nodes[nodo]["capa"]
    nodo1 = nodo-1
    nodo2 = nodo - capa
    #Triangulo izquierda arriba
    if getDecision(G,nodo)!=getDecision(G,nodo1) and getDecision(G,nodo) != getDecision(G,nodo2) and getDecision(G,nodo1) != getDecision(G,nodo2) and getDecision(G,nodo1)!=0 and getDecision(G,nodo2)!=0:
       return [nodo,nodo1,nodo2]
    #Triangulo arriba
    nodo1 = nodo - capa +1
    if getDecision(G,nodo)!=getDecision(G,nodo1) and getDecision(G,nodo) != getDecision(G,nodo2) and getDecision(G,nodo1) != getDecision(G,nodo2) and getDecision(G,nodo1)!=0 and getDecision(G,nodo2)!=0:
       return [nodo,nodo1,nodo2]
    #Triangulo derecha arriba
    nodo2 = nodo +1
    if getDecision(G,nodo)!=getDecision(G,nodo1) and getDecision(G,nodo) != getDecision(G,nodo2) and getDecision(G,nodo1) != getDecision(G,nodo2) and getDecision(G,nodo1)!=0 and getDecision(G,nodo2)!=0:
       return [nodo,nodo1,nodo2]
    #Triangulo izquierda abajo
    nodo1 = nodo -1
    nodo2 = nodo + capa
    if getDecision(G,nodo)!=getDecision(G,nodo1) and getDecision(G,nodo) != getDecision(G,nodo2) and getDecision(G,nodo1) != getDecision(G,nodo2) and getDecision(G,nodo1)!=0 and getDecision(G,nodo2)!=0:
       return [nodo,nodo1,nodo2]
    #Triangulo abajo
    nodo1 = nodo + capa +1
    if getDecision(G,nodo)!=getDecision(G,nodo1) and getDecision(G,nodo) != getDecision(G,nodo2) and getDecision(G,nodo1) != getDecision(G,nodo2) and getDecision(G,nodo1)!=0 and getDecision(G,nodo2)!=0:
       return [nodo,nodo1,nodo2]
    #Triangulo derecha abajo
    nodo2 = nodo +1
    if getDecision(G,nodo)!=getDecision(G,nodo1) and getDecision(G,nodo) != getDecision(G,nodo2) and getDecision(G,nodo1) != getDecision(G,nodo2) and getDecision(G,nodo1)!=0 and getDecision(G,nodo2)!=0:
       return [nodo,nodo1,nodo2]
    return None    

def getDecision(G,nodo):
    return G.nodes[nodo]["decision"]

def getJugador(G,nodo):
    return G.nodes[nodo]["jugador"]

def getPrecio(G,nodo):
    return G.nodes[nodo]["precio"]

def getPrecio1(G,nodo):
    return G.nodes[nodo]["precio"][0]

def getPrecio2(G,nodo):
    return G.nodes[nodo]["precio"][1]

def getPrecio3(G,nodo):
    return G.nodes[nodo]["precio"][2]


def construccionTriangulo(x,precio):
    n = numeroVertices(x)
    G = nx.Graph()
    G.graph["altura"] = x+2
    G.graph["precio"] = precio
    vertices = []
    for k in range(n):
        vertices.append(k)
    atributoComun = {"decision":0}
    G.add_nodes_from(vertices, **atributoComun)
    auxver = []
    aristas = []
    for k in range(1,x+3):
        """Sacamos los vertices a utilizar, exactamente los k siguientes de la lista"""
        
        for j in range(k):
            nodo = vertices.pop(0)
            G.nodes[nodo]["capa"]= k
            auxver.append(nodo) 
            if k!=x+2:             
                lis1 = [nodo,(nodo+k)]
                lis2 = [nodo,(nodo+k+1)]
                aristas.append(lis1)
                aristas.append(lis2)
        longitud = len(auxver)-1
        for i in range(longitud):
            nodo = auxver[i]
            lis = [nodo,nodo+1]
            aristas.append(lis)
        auxver = []
    G.add_edges_from(aristas)
    precioGrafo(G)
    etiquetarGrafo(G)
    return(G)



def numeroVertices(x):
    """Declaro el total con los 3 vertices iniciales y los 3*x vertices laterales"""
    total = 3 + x*3
    internos = 0
    """Calculo el numero de vertices internos que habra"""
    for k in range (x):
        internos += k
    return total+internos


"""Metodos para diseccionar el triangulo"""

def sacarLaterales(G):
    laterales = [0]
    G.nodes[0]["decision"] = 3
    laterales.extend(lateralIzq(G))
    laterales.extend(lateralAbj(G))
    laterales.extend(lateralDer(G))
    return laterales

def sacarCentro(G):
    medio = G.nodes
    laterales = sacarLaterales(G)
    medio = [elemento for elemento in medio if elemento not in laterales]
    return medio

def lateralIzq(G):
    res = []
    alt = G.graph["altura"]
    nodo = 0 
    for i in range(1,alt):
        nodo = nodo+i
        G.nodes[nodo]["decision"] = 1
        res.append(nodo)    
    return res

def lateralDer(G):
    res = []
    altura = G.graph["altura"]
    nodo = 0 
    for i in range(1,altura):
        nodo = nodo +i +1
        G.nodes[nodo]["decision"] = 3
        res.append(nodo)
    G.nodes[res[-1]]["decision"] =2
    res = res[::-1]
    return res

def lateralAbj(G):
    res = []
    resIzq = lateralIzq(G)
    resDer = lateralDer(G)
    primerElem = resIzq[-1]
    UltimoElem = resDer[0]
    for i in range(primerElem+1, UltimoElem):
        G.nodes[i]["decision"] = 2
        res.append(i)
    return res

"""Metodos para etiquetar los nodos"""

def etiquetarGrafo(G):
    etiquetar_lat(G)
    etiquetar_centro(G)

def etiquetar_lat(G):
    lat = sacarLaterales(G)
    jugador =0
    for elemento in lat:
        jugador = (jugador%3)+1
        G.nodes[elemento]["jugador"] = jugador

def etiquetar_centro(G):
    medio = sacarCentro(G)
    latIzq = lateralIzq(G)
    del latIzq[0]
    latIzq.pop(-1)
    i = 1
    for elem in latIzq:
        jugador = G.nodes[elem]["jugador"]
        for j in range(0, i):
            jugador = (jugador % 3) + 1
            G.nodes[medio[0]]["jugador"] = jugador
            del medio[0]
        i += 1


"""Metodos para poner precio a cada nodo"""

def precioGrafo(G):
    for nodo in G.nodes:
       G.nodes[nodo]["precio"] = precioNodo(nodo,G)

def reglaDe3(valor,G):
    precio = G.graph["precio"]
    altura = G.graph["altura"]
    return (valor*precio)/altura

def precioNodo(nodo,G):
    precio = []
    if nodo == 0:
        precio = [0,0,reglaDe3(5,G)]
    elif nodo ==1:
        precio = [0,reglaDe3(1,G),reglaDe3(4,G)]
    elif nodo == 2:
        precio = [reglaDe3(1,G),0,reglaDe3(4,G)]
    else:
        precio.append(reglaDe3(precioIzquierda(G,nodo),G))
        precio.append(reglaDe3(precioAbajo(G,nodo),G))
        precio.append(reglaDe3(precioDerecha(G,nodo),G))
    return precio

def precioIzquierda(G,nodo):
    fin = False
    contador = 0 
    aux = nodo
    while fin == False:
        if not G.has_edge(aux-1,aux):
            fin = True
        else:
            aux = aux -1
            contador = contador +1
    return contador
        
def precioDerecha(G,nodo):
    fin = False
    contador = 0 
    aux = nodo
    while fin ==False:
        if not G.has_edge(aux,aux+1):
            fin = True
        else:
            aux = aux +1
            contador = contador +1
    return contador

def precioAbajo(G,nodo):
    return  G.graph["altura"] - G.nodes[nodo]["capa"] +1 


def decisionAleatoria(G):
    centro = sacarCentro(G)
    for nodo in centro:
        G.nodes[nodo]["decision"] = randint(1,3)





G = construccionTriangulo(3,1000)
G.nodes[4]["decision"] = 1
print(G.nodes[1]["decision"])
print(G.nodes[2]["decision"])
print(G.nodes[4]["decision"])
print(trianguloPerfecto(G,4))
"""
decisionAleatoria(G)
centro = sacarCentro(G)
for nodo in centro:
    triangulo = trianguloPerfecto(G,nodo)
    if triangulo is not None:
        print(triangulo)
"""