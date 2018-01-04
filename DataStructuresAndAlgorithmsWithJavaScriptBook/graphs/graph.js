/**
 * Represents a non-weighted graph storing vertices connections with an adjacency list
 * 
 * @class Graph
 */
class Graph {
    constructor(nodesCount) {
        this.nodes = nodesCount;
        this.edgesCount = 0;

        this.adjacencyList = [];
        for (let i = 0; i < nodesCount; i++) {
            this.adjacencyList[i] = [];
        }
    }

    /**
     * Adds an edge between two nodes in the graph
     * 
     * @param {Number} from first vertex 
     * @param {Nuber} to second vertex
     * 
     * @memberOf Graph
     */
    addEdge(from, to) {
        this.adjacencyList[from].push(to);
        this.adjacencyList[to].push(from);
        this.edgesCount++;
    }
    
      /**
     * Depth-First graph searching algorithm.
     * Returns whether there's a path between two nodes in a graph.<br><br>
     * 
     * @param {Number} startNode node to start searching the graph from 
     * @param {Number} targetNode not to search for 
     * 
     * @memberOf Graph
     */
    dfs(startNode, targetNode) {
        const visited = [];
        return this._dfs(startNode, targetNode, visited);
    }

    _dfs(current, target, visited) {
        if (current === target) {
            return true;
        }

        visited[current] = true;

        for (let i = 0; i < this.adjacencyList[current].length; i++) {
            const adjacentNode = this.adjacencyList[current][i];
            if (!visited[adjacentNode]) {
                const areConnected = this._dfs(adjacentNode, target, visited);
                if (areConnected) {
                    return true;
                }
            }
        }

        return false;
    }
    
    /**
     * Prints out each node and it's adjacent nodes
     * 
     * @memberOf Graph
     */
    showGraph() {
        this.adjacencyList.forEach((vertexPaths, index) => {
            console.log(`${index} => ${vertexPaths.join(', ')}`);
        });
    }
}

module.exports = Graph;
