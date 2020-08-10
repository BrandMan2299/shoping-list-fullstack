let products = [
  {
    id: "0",
    name: "milk",
    price: "10",
    amount: 2
  },
  {
    id: "1",
    name: "cerial",
    price: "23",
    amount: 3
  },
  {
    id: "2",
    name: "watermellon",
    price: "29",
    amount: 4
  },
  {
    id: "3",
    name: "cola",
    price: "12",
    amount: 5
  },
  {
    id: "4",
    name: "bread",
    price: "8",
    amount: 6
  },
];

const express = require("express");
const app = express();
const { port } = require("./galModules");
const { readFileSync } = require("fs");
var path = require("path");
app.use("/", express.static(path.join(__dirname, '../frontend')))



app.get("/", (req, res) => {
  res.sendFile("home.html", { root: path.join(__dirname, "../frontend") });
  // res.sendFile(`./../frontend/home.html`);
});

app.get("/cart", (req, res) => {
    res.sendFile("cart.html", { root: path.join(__dirname, "../frontend") });
    // res.sendFile(`./../frontend/home.html`);
  });
app.get("/products", (req, res) => {
  res.send(products);
});

app.get("/products/:id", (req, res) => {
  for (const product of products) {
    if (product.id === req.params.id) {
      res.send(product);
    }
  }
});

app.post("/products", (req, res) => {
  products.forEach((product) => {
    if (product.id === req.body.id) {
      res.send("Id alredy exists, please change id");
    }
  });
  products.push(req.body);
  res.send(req.body);
});

app.put("/products/:id", (req, res) => {
  products.forEach((product, index) => {
    if (product.id === req.params.id) {
      products.splice(index, 1, req.body);
      res.send(req.body);
    }
  });
});

app.delete("/products/:id", (req, res) => {
  products.forEach((product, index) => {
    if (product.id === req.params.id) {
      products.splice(index, 1);
      res.send("Product deleted");
    }
  });
});

app.listen(port, () => {
  console.log(`Server Is Listening On Port ${port}`);
});
