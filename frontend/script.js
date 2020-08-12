port = 3030;

axios.defaults.baseURL = `http://localhost:${port}`;
axios.defaults.headers.post["Content-Type"] = "application/json; charset=utf-8";
axios.defaults.validateStatus = (status) => status >= 200 && status < 300;

const defaultImgSrc = `css/images/nophoto.jpg`;
const add_btn = document.getElementById("add_btn");
const id_name = document.getElementById("id_name");
const id_price = document.getElementById("id_price");
const id_amount = document.getElementById("id_amount");
// const localStorage = window.localStorage;

// // tasks counter deceleration
// let productCounter = localStorage.getItem("counter")
//   ? localStorage.getItem("counter")
//   : 0;

NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
HTMLCollection.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];

var products = [];
var discount = [];
var deletedProducts = [];

const getList = async () => {
  console.log("getList");
  try {
    const { data } = await axios.get(`/products`);
    console.log("Products Data", data);
    return data;
  } catch (e) {
    console.log("Error Getting Products");
    console.log(e);
  }
};

const init = () => {
  showProd().then(() => {
    // AddToStorage()
    var id_parent = document.getElementById("id_parent");
    var boxes = id_parent.getElementsByClassName("productBox"); // HTML Collection
    Array.from(boxes).forEach((box) => {
      addBTNEvent(box);
    });
  });
  add_btn.onclick = () => {
    var obj = {
      name: id_name.value,
      id: generateID(),
      price: id_price.value,
      amount: id_amount.value,
    };
    pushProduct(obj);
    console.log("add to storage?");
    // AddToStorage(obj)
  };
};

const showProd = async () => {
  prod_ar = await getList();
  products = prod_ar;
  id_parent.innerHTML = "";

  products.forEach((item) => {
    var newProd = new Product(
      item.id,
      item.name,
      item.price,
      item.amount,
      id_parent
    );
    newProd.addToHtml();
  });
};

const pushProduct = async (product) => {
  console.log(product);
  console.log("Pushed");
  await axios.post("/product", product).then((r) => r.data);
  init();
};

const generateID = () => {
  let prodId = Math.floor(Math.random() * 1000);
  products.map((product) => {
    if (product.id === prodId) {
      prodId = generateID();
    }
  });
  return prodId.toString();
};

function addBTNEvent(box) {
  console.log("Product Box", box);
  var buttonsElement = box.querySelector(".buttons");

  var minusBTN = buttonsElement.querySelector(".minus-button");

  var plusBTN = buttonsElement.querySelector(".plus-button");
  var editBTN = buttonsElement.querySelector(".edit-button");

  var deleteBTN = buttonsElement.querySelector(".delete-btn");

  var likeBTN = buttonsElement.querySelector(".like-btn");
  var prodAmount = box.querySelector(".amountInput");
  var prodPrice = box.querySelector(".productPrice");
  var productTitlePrice = prodPrice.querySelector(".productTitlePrice");
  var productPriceDiv = box.querySelector(".productPriceDiv");
  var productTotalPrice = productPriceDiv.querySelector(".productTotalPrice");
  var productName = box.querySelector(".productHeader");

  if (!prodAmount.value) {
    prodAmount.value = 0;
  }

  prodAmount.addEventListener("input", () => {
    let quantityNum = parseInt(prodAmount.value, 10);
    let prodPriceVal = parseInt(productTitlePrice.innerHTML, 10);
    let total = prodPriceVal * quantityNum;
    productTotalPrice.innerHTML = total ? total : 0;
  });

  plusBTN.onclick = () => {
    var quantityNum = parseInt(prodAmount.value, 10);
    let prodPriceVal = parseInt(productTitlePrice.innerHTML, 10);

    quantityNum += 1;
    prodAmount.value = quantityNum;
    let total = prodPriceVal * quantityNum;
    productTotalPrice.innerHTML = total ? total : 0;
    console.log("Prod Amount", quantityNum);
  };
  minusBTN.onclick = () => {
    var quantityNum = parseInt(prodAmount.value, 10);
    let prodPriceVal = parseInt(productTitlePrice.innerHTML, 10);

    quantityNum -= 1;
    quantityNum = quantityNum > 0 ? quantityNum : 0;
    prodAmount.value = quantityNum > 0 ? quantityNum : 0;
    let total = prodPriceVal * quantityNum;
    productTotalPrice.innerHTML = total > 0 ? total : 0;
    console.log("Prod Amount", quantityNum);
  };

  deleteBTN.onclick = () => {
    console.log(products);
    var productId;
    prod = products.filter((product) => product.name == productName.innerText);
    console.log(prod);
    productId = prod[0].id;
    console.log(prod[0].id);
    // products.forEach( async (product) => {
    //   if (product.name == productName.innerText) {
    //     console.log(product.name, "IS Equal", productName.innerText)
    //     productId = product.id;
    //   }

    // })

    deleteProduct(productId);
    init();
    console.log(a);
    // deleteProduct()
  };
  editBTN.onclick = () => {
    product = products.filter(
      (product) => product.name == productName.innerText
    );
    var prodOBJ = editBTN.parentNode.parentNode;
    editProduct(prodOBJ, product);
  };
}

const deleteProduct = async (productId) => {
  console.log(productId);
  await axios.delete(`/products/${productId}`).then((r) => r.data);
  console.log("Deleted");
};






const editProduct = async (prodOBJ, product) => {
  console.log("Editing Task");
  console.log("ProdOBJ", prodOBJ);
  console.log("Product", product);
  name = prompt("Choose New Product Name")
  price = prompt("Choose New product Price") 
  amount = prompt("Choose New Product Amount")

  console.log(product[0].name)
  var name = (name.length > 2) ? name:product[0].name
  var price = (price > 0) ? price:product[0].price
  var amount = (amount > 0) ? amount:product[0].amount
  console.log(name, price ,amount)
  console.log(parent)
  var editProduct = new Product (product[0].id, name, price, amount, id_parent)
  await axios.put(`/products/${product[0].id}`, editProduct).then((r) => r.data);
  init();
  

}

// const editProduct = async (prodOBJ, product) => {
//   console.log("Editing Task");
//   console.log("ProdOBJ", prodOBJ);
//   console.log("Product", product);
//   let containsClass = prodOBJ.classList.contains("editMode");
//   console.log(containsClass);
//   debugger;

//   if (!containsClass) {
//     prodOBJ.classList.add("editMode");


//     event.target.innerHTML = "Save";
//     name = prompt("Choose New Product Name")
//     price = prompt("Choose New product Price")
//     amount = prompt("Choose New Product Amount")
//     editedProduct = {
//       id: product.id,
//       name: (name > 2) ? name:product.name,
//       price: (price > 0) ? price:product.price,
//       amount: (amount > 0) ? amount:0
//     };    
//     if (editProduct.name < 2) {
//       alert("Name Must Be 2 Characters min");
//     }
//       // window.location.reload();
//   } else if(event.target.innerHTML == "Save") {

//     prodOBJ.classList.remove("editMode");
//     event.target.type = "submit";
//     event.target.onclick = async () => {
//       vent.target.innerHTML == "Edit"
//       await axios.put(`/products/${product.id}`, editProduct).then((r) => r.data);
//       init();
//       // window.location.reload();
//     }
    
//   }};
