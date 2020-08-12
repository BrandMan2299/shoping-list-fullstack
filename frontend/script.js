//The Port is Specified in Port.js
// Need To Add Import Port
port = 3030;

// Defining Axios Defaults
axios.defaults.baseURL = `http://localhost:${port}`;
axios.defaults.headers.post["Content-Type"] = "application/json; charset=utf-8";
axios.defaults.validateStatus = (status) => status >= 200 && status < 300;

//Global Scope Variables
const defaultImgSrc = `css/images/nophoto.jpg`;
const add_btn = document.getElementById("add_btn");
const id_name = document.getElementById("id_name");
const id_price = document.getElementById("id_price");
const id_amount = document.getElementById("id_amount");

// Adding This Allows To use HTML Collection or Node List as an Array
NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
HTMLCollection.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];

var products = [];

// Function To Get The Product List From The Server
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
  showProd();
};

// Function To Show The Products On The HTML Page
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

//Function To Generate Random ID That's not existing on The Product List
const generateID = () => {
  let prodId = Math.floor(Math.random() * 1000);
  products.map((product) => {
    if (product.id === prodId) {
      prodId = generateID();
    }
  });
  return prodId.toString();
};

// Adding Function To Push Product in to Product List
const pushProduct = async (product) => {
  console.log(product);
  console.log("Pushed");
  await axios.post("/product", product).then((r) => r.data);
  init();
};

// Function To Add Events To Buttons Ob the Product
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
}

//Event Listener On Changing The Amount of Product Using The Input
prodAmount.addEventListener("input", () => {
  let quantityNum = parseInt(prodAmount.value, 10);
  let prodPriceVal = parseInt(productTitlePrice.innerHTML, 10);
  let total = prodPriceVal * quantityNum;
  productTotalPrice.innerHTML = total ? total : 0;
});

//Event Listener On Plus Button To Add 1 Product  to amount and update the total price
plusBTN.onclick = () => {
  var quantityNum = parseInt(prodAmount.value, 10);
  let prodPriceVal = parseInt(productTitlePrice.innerHTML, 10);

  quantityNum += 1;
  prodAmount.value = quantityNum;
  let total = prodPriceVal * quantityNum;
  productTotalPrice.innerHTML = total ? total : 0;
  console.log("Prod Amount", quantityNum);
};

//Event Listener On Minus Button To decrease 1 Product  from the  amount and update the total price
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
