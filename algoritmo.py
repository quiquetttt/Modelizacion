import networkx as nx

def trianguloPerfecto(G,nodo):
    adyacentes = list(G.neihbors(nodo))
    print(adyacentes)


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
    altura = G.graph["altura"]
    nodo = 0 
    for i in range(1,altura):
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
    altura = G.graph["altura"]-1
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
    return  G.graph["altura"] - G.nodes[nodo]["capa"]
"""
G =construccionTriangulo(4,1000)
nodos = list(G.nodes)
nodos0 = [elem for elem in nodos if G.nodes[elem]["decision"]==0]
nodos1 = [elem for elem in nodos if G.nodes[elem]["decision"]==1]
nodos2 = [elem for elem in nodos if G.nodes[elem]["decision"]==2]
nodos3 = [elem for elem in nodos if G.nodes[elem]["decision"]==3]
print("Nodos decision 0")
print(nodos0)
print("Nodos decision 1")
print(nodos1)
print("Nodos decision 2")
print(nodos2)
print("Nodos decision 3")
print(nodos3)
"""