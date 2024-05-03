import networkx as nx
import matplotlib.pyplot as plt
def main():
    G = construccionTriangulo(4)
    precioGrafo(G)





"""Metodos para construir el triangulo"""
"""x = numero de vertices laterales (sin contar las dos esquinas)"""



def construccionTriangulo(x):
    n = numeroVertices(x)
    G = nx.Graph()
    G.graph["altura"] = x+2
    vertices = []
    for k in range(n):
        vertices.append(k)
    G.add_nodes_from(vertices , decision = "")
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
    laterales.append()


def lateralIzq(G):
    res = []
    altura = G.graph["altura"]
    nodo = 0 
    for i in range(1,altura):
        nodo = nodo+i
        res.append(nodo)
        
    return res

def lateralDer(G):
    res = []
    altura = G.graph["altura"]
    nodo = 0 
    for i in range(1,altura):
        nodo = nodo +i +1
        res.append(nodo)
    return res

def lateralAbj(G):
    pass




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
        precio.append(precioDerecha(G,nodo))
        precio.append(precioAbajo(G,nodo))
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

        




def pruebas():
    for k in range(1,6):
        print(k)




if __name__ == "__main__":
    main()
