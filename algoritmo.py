import networkx as nx
import matplotlib.pyplot as plt
def main():
    construccionTriangulo(10)

"""Funciona"""
def numeroVertices(x):
    """Declaro el total con los 3 vertices iniciales y los 3*x vertices laterales"""
    total = 3 + x*3
    internos = 0
    """Calculo el numero de vertices internos que habra"""
    for k in range (x):
        internos += k
    return total+internos
    
"""x = numero de vertices laterales (sin contar las dos esquinas)"""
def construccionTriangulo(x):
    n = numeroVertices(x)
    G = nx.Graph()
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
            auxver.append(nodo) 
            if(k!=x+2):             
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
    nx.draw(G, with_labels=True)
    plt.show()


        

def pruebas():
    for k in range(1,6):
        print(k)




if __name__ == "__main__":
    main()