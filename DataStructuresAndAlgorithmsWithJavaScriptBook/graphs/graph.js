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
     * Build up the path from a node to it's root parent using the parents array
     * 
     * @param {Array<Number>} parents arrays storing each node's parent node
     * @param {Number} node node to start from 
     * @returns {Array<number>} the path from the node to it's root parent
     * 
     * @memberOf Graph
     */
    _buildPath(parents, node) {
        const result = [];
        result.push(node);

        while (parents[node] !== null) {
            result.push(parents[node]);
            node = parents[node];
        }

        return result.reverse();
    }

    /**
     * Breath-First graph searching algorithm.
     * Returns the shortest path between startNode and targetNode.
     * 
     * @param {Number} startNode node to start searching the graph from
     * @param {Number} targetNode node to search for
     * @returns {Array} the shortest path from starsNode to targetNode 
     * 
     * @memberOf Graph
     */
    bfs(startNode, targetNode) {
        const parents = [];
        const queue = [];
        const visited = [];

        parents[startNode] = null;
        visited[startNode] = true;

        queue.push(startNode);

        while (queue.length > 0) {
            const current = queue.shift();

            if (current === targetNode) {
                return this._buildPath(parents, current);
            }

            this.adjacencyList[current].forEach((vertex) => {
                if (!visited[vertex]) {
                    visited[vertex] = true;
                    parents[vertex] = current;
                    queue.push(vertex);
                }
            });
        }

        return null;
    }
    
    /**
     * Topological sorting graph algorithm.
     * 
     * @returns {Array<number>} the graph vertices in topologically sorted order
     * @public
     * @memberOf Graph
     */
    topologicalSort() {
        const resultStack = [];
        const visited = [];

        for (let i = 0; i < this.adjacencyList.length; i++) {
            if (!visited[i]) {
                this._topologicalSort(i, visited, resultStack);
            }
        }

        return resultStack.reverse();
    }

    _topologicalSort(node, visited, resultStack) {
        visited[node] = true;

        if (this.adjacencyList[node]) {
            this.adjacencyList[node].forEach(adjNode => {
                if (!visited[adjNode]) {
                    this._topologicalSort(adjNode, visited, resultStack);
                }
            });
        }

        resultStack.push(node);
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
