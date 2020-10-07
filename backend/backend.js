let products = [
  {
    id: "0",
    name: "milk",
    price: 10,
    amount: 0,
  },
  {
    id: "1",
    name: "cerial",
    price: 23,
    amount: 0,
  },
  {
    id: "2",
    name: "watermellon",
    price: 29,
    amount: 0,
  },
  {
    id: "3",
    name: "cola",
    price: 12,
    amount: 0,
  },
  {
    id: "4",
    name: "bread",
    price: 8,
    amount: 0,
  },
];

const express = require("express");
const app = express();
const { port } = require("./port");
var path = require("path");
app.use(express.json());

app.get("/", (req, res) => {
  app.use("/", express.static(path.join(__dirname, "../frontend")));
  res.sendFile("home.html", { root: path.join(__dirname, "../frontend") });
  // res.sendFile(`./../frontend/home.html`);
});



app.get("/products", (req, res) => {
  console.log(req.query.SearchText)
  res.send(products);
});

app.get("/products/:id", (req, res) => {
  for (const product of products) {
    if (product.id === req.params.id) {
      res.send(product);
    }
  }
});

app.post("/product", (req, res) => {
  products.push(req.body);
  console.log("Product", req.body);
  res.send(req.body);
});

app.put("/products/:id", (req, res) => {
  products.forEach((product, index) => {
    if (product.id === req.params.id) {
      products.splice(index, 1, req.body);
      console.log("New Product", req.body, "Old Product", product);
      res.send(req.body);
    }
  });
});

app.delete("/products/:id", (req, res) => {
  products.forEach((product, index) => {
    if (product.id == req.params.id) {
      console.log("Equal")
      products.splice(index, 1);
      console.log("Product", req.params.id, "Deleted");
      res.send(`Product ${req.params.id} deleted`);

    }
  });
});

app.listen(port, () => {
  console.log(`Server Is Listening On Port ${port}`);
});
