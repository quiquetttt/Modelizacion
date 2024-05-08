import networkx as nx
import matplotlib.pyplot as plt
def main():
    G = construccionTriangulo(4)
    etiquetarGrafo(G)
    for nodo in G.nodes:
        print(nodo)
        print(G.nodes[nodo])

def algoritmo():
    G = construccionTriangulo(4)
    precioGrafo(G)
    etiquetarGrafo(G)
    centro = sacarCentro(G)
    for nodo in centro:
        tomarDecision(G,nodo)
    

def tomarDecision():
    pass

    





"""Metodos para construir el triangulo"""
"""x = numero de vertices laterales (sin contar las dos esquinas)"""



def construccionTriangulo(x):
    n = numeroVertices(x)
    G = nx.Graph()
    G.graph["altura"] = x+2
    vertices = []
    for k in range(n):
        vertices.append(k)
    G.add_nodes_from(vertices)
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
    return G

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
    pintura =0
    for elemento in lat:
        pintura = (pintura%3)+1
        G.nodes[elemento]["pintura"] = pintura

def etiquetar_centro(G):
    medio = sacarCentro(G)
    latIzq = lateralIzq(G)
    del latIzq[0]
    latIzq.pop(-1)
    i = 1
    for elem in latIzq:
        pintura = G.nodes[elem]["pintura"]
        for j in range(0, i):
            pintura = (pintura % 3) + 1
            G.nodes[medio[0]]["pintura"] = pintura
            del medio[0]
        i += 1


"""Metodos para poner precio a cada nodo"""

def precioGrafo(G):
    for nodo in G.nodes:
        G.nodes[nodo]["precio"] = precioNodo(nodo,G)


def precioNodo(nodo,G):
    precio = []
    if nodo == 0:
        precio = [0,0,5]
    elif nodo ==1:
        precio = [0,1,4]
    elif nodo == 2:
        precio = [1,0,4]
    else:
        precio.append(precioIzquierda(G,nodo))
        precio.append(precioAbajo(G,nodo))
        precio.append(precioDerecha(G,nodo))
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


if __name__ == "__main__":
    main()
