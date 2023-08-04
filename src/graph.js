import { Node } from "./node";

class Graph {
  constructor(nodes, edges) {
    this.nodes = nodes;
    this.edges = edges;
  }

  addNode(node) {}

  removeNode(node) {}

  addEdge(nodeA, nodeB) {}

  removeEdge(nodeA, nodeB) {}

  getNeighbors(node) {}

  getNodes() {
    return this.nodes;
  }

  // KNN algorithm
  knn() {}

  // Dijkstra's algorithm
  dijkstra(start) {}

  // A* algorithm
  a_star(start) {}
}
