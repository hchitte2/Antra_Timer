import http from "http";
import { randomUUID } from "crypto";

let posts = [
  { id: randomUUID(), author: "Alice", body: "Hello from the backend!" },
  { id: randomUUID(), author: "Bob", body: "React Router loaders are great." },
];

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function sendJSON(res, status, data) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

function readBody(req) {
  return new Promise((resolve) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => resolve(body ? JSON.parse(body) : {}));
  });
}

const server = http.createServer(async (req, res) => {
  setCors(res);

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://localhost:8080`);
  const parts = url.pathname.split("/").filter(Boolean); // e.g. ['posts'] or ['posts', '<id>']

  // GET /posts
  if (req.method === "GET" && parts[0] === "posts" && !parts[1]) {
    return sendJSON(res, 200, { posts });
  }

  // GET /posts/:id
  if (req.method === "GET" && parts[0] === "posts" && parts[1]) {
    const post = posts.find((p) => p.id === parts[1]);
    return sendJSON(res, post ? 200 : 404, { post: post || null });
  }

  // POST /posts
  if (req.method === "POST" && parts[0] === "posts" && !parts[1]) {
    const body = await readBody(req);
    const newPost = { id: randomUUID(), ...body };
    posts.unshift(newPost);
    return sendJSON(res, 201, { post: newPost });
  }

  sendJSON(res, 404, { message: "Not found" });
});

server.listen(8080, () => {
  console.log("Backend running at http://localhost:8080");
});
