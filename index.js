var inf = Number.MAX_SAFE_INTEGER;
// var adj_matrix = [
//   [0, 6, 1, 0, 0, 2, 7, 0, 0, 0],
//   [6, 0, 0, 7, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 10, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 5, 0, 1],
//   [0, 0, 0, 0, 0, 4, 0, 0, 0, 0],
//   [0, 0, 0, 0, 4, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 3, 0],
//   [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 3, 0, 0, 0],
//   [0, 4, 0, 0, 0, 0, 6, 0, 0, 0],
// ];

var adj_matrix = [
  [0, 1, 1, 1, 0, 0],
  [1, 0, 0, 1, 1, 0],
  [1, 0, 0, 1, 1, 0],
  [1, 1, 1, 0, 1, 1],
  [0, 1, 0, 1, 0, 1],
  [0, 0, 1, 1, 1, 0],
];

const Construct_Graph = (width) => {
  var matrix = new Array(Math.pow(width, 2));
  for (var i = 0; i < matrix.length; i++) {
    matrix[i] = new Array(Math.pow(width, 2));
  }
  for (var i = 0; i < matrix.length; i++) {
    for (var j = 0; j < matrix.length; j++) {
      if (
        i == j + 1 ||
        i == j - 1 ||
        i == j - width ||
        i == j + width ||
        i == width + j + 1 ||
        i == width + j - 1 ||
        i == j - width + 1 ||
        i == j - width - 1
      ) {
        matrix[i][j] = 1;
      } else {
        matrix[i][j] = 0;
      }
    }
  }
  return matrix;
};

//var adj_matrix = Construct_Graph(10);

console.log(adj_matrix);

var start_node = 0;

var V = adj_matrix.length;

const A_star = (graph, start) => {};

const minDistance = (dist, sptSet) => {
  var min = Number.MAX_SAFE_INTEGER;
  var min_index = -1;

  for (var v = 0; v < V; v++) {
    if (sptSet[v] == false && dist[v] <= min) {
      min = dist[v];
      min_index = v;
    }
  }

  return min_index;
};

const printSolution = (dist, parent, src) => {
  for (var i = 0; i < V; i++) {
    console.log(
      "Target: " +
        i +
        ", Minimum Distance: " +
        dist[i] +
        ", Path: " +
        src +
        printPath(parent, i)
    );
  }
};

const printPath = (parent, j) => {
  var output = "";
  if (parent[j] == -1) {
    return output;
  }

  output += printPath(parent, parent[j]);

  output += " --> " + j;

  return output;
};

const Dijkstra = (arr, src) => {
  var dist = new Array(V);
  var sptSet = new Array(V);
  var parent = new Array(V);

  for (var i = 0; i < V; i++) {
    parent[i] = -1;
    dist[i] = Number.MAX_SAFE_INTEGER;
    sptSet[i] = false;
  }

  dist[src] = 0;

  for (var count = 0; count < V - 1; count++) {
    var u = minDistance(dist, sptSet);
    sptSet[u] = true;
    for (var v = 0; v < V; v++) {
      if (
        !sptSet[v] &&
        arr[u][v] != 0 &&
        dist[u] != Number.MAX_SAFE_INTEGER &&
        dist[u] + arr[u][v] < dist[v]
      ) {
        parent[v] = u;
        dist[v] = dist[u] + arr[u][v];
      }
    }
  }
  printSolution(dist, parent, src);
};

const Floyd = (graph, src) => {
  var dist = graph;
  for (var i = 0; i < dist.length; i++) {
    for (var j = 0; j < dist.length; j++) {
      if (i != j && dist[i][j] == 0) {
        dist[i][j] = Number.MAX_SAFE_INTEGER;
      }
    }
  }
  for (var k = 0; k < V; k++) {
    for (var i = 0; i < V; i++) {
      for (var j = 0; j < V; j++) {
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
        }
      }
    }
  }
  return dist[src];
};

const Topological_sort = (graph) => {
  var sorted = [];
  var in_degree = new Array(graph.length);
  for (var i = 0; i < graph.length; i++) {
    var t = 0;
    for (var j = 0; j < graph.length; j++) {
      if (graph[i][j] > 0) {
        t++;
      }
    }
    in_degree[i] = t;
  }
  while (sorted.length < graph.length) {
    var p = in_degree.indexOf(0);
    if (p == -1) {
      return NaN;
    } else {
      sorted.push(p);
      in_degree = Fix(p, graph, in_degree);
    }
  }
  console.log(sorted);
};

const Fix = (node, graph, list) => {
  for (var i = 0; i < V; i++) {
    if (graph[node][i] > 0) {
      list[i]--;
    }
  }
  return list;
};

const BFS = (graph, start) => {
  var size = graph.length;
  var visited = new Array(size);
  for (var i = 0; i < visited.length; i++) {
    visited[i] = false;
  }
  visited[start] = true;

  var queue = [start];

  var print = [];

  while (print.length < graph.length) {
    var current = queue.shift();
    print.push(current);
    var adj = Get_Adjacent(current, graph);
    for (var i in adj) {
      if (visited[adj[i]] == false) {
        visited[adj[i]] = true;
        queue.push(adj[i]);
      }
    }
  }
  return print;
};

const DFS = (graph, start) => {
  var size = graph.length;
  var visited = new Array(size);
  for (var i = 0; i < visited.length; i++) {
    visited[i] = false;
  }

  var stack = [start];

  var print = [];

  while (print.length < graph.length) {
    var current = stack.pop();
    print.push(current);
    visited[current] = true;
    var adj = Get_Adjacent(current, graph);
    for (var i in adj) {
      if (visited[adj[i]] == false) {
        visited[adj[i]] = true;
        stack.push(adj[i]);
      }
    }
  }
  return print;
};

const Get_Adjacent = (node, graph) => {
  var output = [];
  for (var i = 0; i < graph.length; i++) {
    if (graph[node][i] > 0 || graph[i][node] > 0) {
      if (output.indexOf(i) == -1) {
        output.push(i);
      }
    }
  }
  return output;
};

Dijkstra(adj_matrix, start_node);

console.log("BFS Traversal: " + BFS(adj_matrix, 0));

console.log("DFS Traversal: " + DFS(adj_matrix, 0));

//console.log(Floyd(adj_matrix, start_node));

Topological_sort(adj_matrix);
