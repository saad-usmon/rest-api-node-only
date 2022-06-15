function getAllData(req) {
  return new Promise((resolve, reject) => {
    try {
      let data = "";
      req.on("data", (chunk) => {
        data += chunk.toString();
      });

      req.on("end", () => {
        resolve(data);
      });
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = getAllData;
