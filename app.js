const http = require("http");
const { v4 } = require("uuid");
const getPatientData = require("./util");
const PORT = 8000;

const patients = [
  {
    id: v4(),
    name: "Shohabbos",
    age: 20,
    problem: "lung-cancer",
  },
];

const server = http.createServer(async (req, res) => {
  if (req.url == "/patient" && req.method == "GET") {
    const resp = {
      status: "OK",
      patients,
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(resp));
  } else if (req.url == "/patient" && req.method == "POST") {
    const data = await getPatientData(req);
    const { name, age, problem } = JSON.parse(data);
    const patient = {
      id: v4(),
      name,
      age,
      problem,
    };

    patients.push(patient);
    const resp = {
      status: "Created",
      patient,
    };
    res.writeHead(200, { "Content-Type": "application/json charset = utf8" });
    res.end(JSON.stringify(resp));
  }
});

server.listen(process.env.PORT || PORT, () => {
  console.log(`The port is running: ${PORT}`);
});
