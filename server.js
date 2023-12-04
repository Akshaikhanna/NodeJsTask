const express = require("express");
const fs = require("fs");
const axios = require("axios");
const app = express();
const port = 3001;
const inputFile = "file.txt";
const outputFile = "output.txt";
const api = "https://jsonplaceholder.typicode.com/posts";

app.use(express.text());

fs.readFile(inputFile, "utf8", (err, data) => {
  if (err) {
    console.error(`Error reading file ${inputFile}: ${err.message}`);
    return;
  }

  fs.writeFile(outputFile, data, "utf8", (err) => {
    if (err) {
      console.error(`Error writing to file ${outputFile}: ${err.message}`);
      return;
    }
    console.log(
      `Content successfully copied from ${inputFile} to ${outputFile}`
    );
  });
});

app.get("/post-data", (req, res) => {
  res.send("Hello, this is a GET request to /post-data!");
});

app.post("/post-data", (req, res) => {
  console.log("Received POST data:", req.body);
  res.send("POST request handled successfully!");
});

// axios
//   .get(api)
//   .then((response) => {
//     console.log("Response:", response.data);
//   })
//   .catch((error) => {
//     console.log("Error:", error.message);
//   });
axios.get(api).then((response)=>{
    console.log("Response:",response.data);
})
.catch((error)=>{
    console.log("Error:",error.message);
})

app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/`);
});

