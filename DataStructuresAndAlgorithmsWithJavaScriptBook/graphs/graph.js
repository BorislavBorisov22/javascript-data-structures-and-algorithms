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
