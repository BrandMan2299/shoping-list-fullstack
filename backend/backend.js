let products = [
  {
    id: "0",
    name: "milk",
    price: "10",
  },
  {
    id: "1",
    name: "cerial",
    price: "23",
  },
  {
    id: "2",
    name: "watermellon",
    price: "29",
  },
  {
    id: "3",
    name: "cola",
    price: "12",
  },
  {
    id: "4",
    name: "bread",
    price: "8",
  },
];

const express = require("express");
const app = express();
const { port } = require("./galModules");
const { readFileSync } = require("fs");
var path = require("path");
app.use("/", express.static(path.join(__dirname, '../frontend')))

const rootPath = (folderPath) => {
  return {
    root: path.join(__dirname, `../../shoping-list-fullstack/${folderPath}`),
  };
};

app.get("/", (req, res) => {
  res.sendFile("home.html", { root: path.join(__dirname, "../frontend") });
  // res.sendFile(`./../frontend/home.html`);
});



// app.get('/', (req, res) => {
//     app.use("/", express.static())
//     res.sendFile(path.resolve(''))
//     // res.sendFile(`./../frontend/home.html`);
// })
// app.get('/', (req, res) => {
//     app.use("/", express.static())
//     res.sendFile('home.html')
//     // res.sendFile(`./../frontend/home.html`);
// })

// app.get('/', (req, res) => {
//     let path = require("path");
//     app.use(express.static(`${__dirname}`))
//     // const homeFile = readFileSync(path.resolve(__dirname, '../frontend/home.html'));
//     const homeFile = readFileSync('../frontend/home.html')
//     res.send(homeFile);
// })

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
