const http = require("http");
const { reset } = require("nodemon");
const path = require("path");
const PORT = 8000;

const patients = [
  {
    name: "Shoira",
    surname: "Umidova",
    age: 45,
    problem: "lung cancer",
  },
];

const server = http.createServer((req, res) => {
  if (req.url === "/books" && req.method === "GET") {
    res.writeHead(200, { Con: "application/json charset = utf8" });

    const resp = {
      status: "OK",
      patients,
    };
    res.end(JSON.stringify(resp));
  }
});

server.listen(process.env.PORT || 8000, () => {
  console.log(`The port, number ${PORT} is running!`);
});
