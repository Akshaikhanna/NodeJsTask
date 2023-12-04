// CRUD API
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.use((req,res,next)=>{
  console.log(`${newDate().toLocalString()}`);
  console.log(`${req.method}`);
  console.log(`${req.url}`);
})

let items = [
  { id: 1, name: "Yokesh" },
  { id: 2, name: "Ram" },
  { id: 3, name: "Hari" },
];

app.get("/items", (req, res) => {
  res.status(200);
  res.json(items);
});

app.get("/items/:id", (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = items.find((item) => item.id === itemId);
  if (!items) {
    return res.status(404).json({ error: "Item not found" });
  }
  res.json(item);
});

app.post("/items", (req, res) => {
  const newItem = req.body;
  if (!newItem || newItem.name) {
    return res.status(400).json({ error: "Invalid request body" });
  }
  newItem.id = items.length + 1;
  items.push(newItem);
  res.status(400).json(newItem);
});

app.put("/items/:id", function (req, res) {
  const itemId = parseInt(req.params.id);
  const updatedItem = req.body;
  const existingItem = items.find((item) => item.id === itemId);
  if (!existingItem) {
    res.status(400).json({ error: "Items not found" });
  }
  if (!updatedItem || !updatedItem.name) {
    res.status(400).json({ error: "Invalid updated item" });
  }
  existingItem.name = updatedItem.name;
  res.json(existingItem);
});

app.delete("/items/:id", (req, res) => {
  const itemId = parseInt(req.params.id);
  const index = items.findIndex((item) => item.id === itemId);

  if (index === -1) {
    return res.status(404).json({ error: "Item not found" });
  }
  const deleteItem = items.splice(index, 1)[0];
  res.json(deleteItem);
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
