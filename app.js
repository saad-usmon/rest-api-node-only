const http = require("http");
const { v4 } = require("uuid");
const getAllData = require("./util");
const getPatientData = require("./util");
const PORT = 8000;

const patients = [
  {
    id: 1,
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
  } else if (req.url.match(/\/patient\/\w+/) && req.method == "GET") {
    const id = req.url.split("/")[2];
    const patient = patients.find((p) => p.id == id);
    const resp = {
      status: "FOUND",
      patient,
    };
    res.writeHead(200, { "Content-Type": "application/json charset = utf8" });
    res.end(JSON.stringify(resp));
  } else if (req.url.match(/\/patient\/\w+/) && req.method == "PUT") {
    const id = req.url.split("/")[2];
    const data = await getAllData(req);
    const { name, age, problem } = JSON.parse(data);
    const index = patients.findIndex((p) => p.id == id);

    const changePatient = {
      id: patients[index].id,
      name: name || patients[index].name,
      age: age || patients[index].age,
      problem: problem || patients[index].problem,
    };

    patients[index] = changePatient;

    const resp = {
      status: "UPDATED",
      changePatient,
    };
    res.writeHead(200, { "Content-Type": "application/json charset = utf8" });
    res.end(JSON.stringify(resp));
  } else if (req.url.match(/\/patient\/\w+/) && req.method == "DELETE") {
    const id = req.url.split("/")[2];
    const index = patients.findIndex((p) => {
      p.id = id;
    });
    patients.splice(index, 1);

    const resp = {
      status: "DELETED",
      patients,
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(resp));
  }
});

server.listen(process.env.PORT || PORT, () => {
  console.log(`The port is running: ${PORT}`);
});
