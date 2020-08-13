//The Port is Specified in Port.js
// Need To Add Import Port
port = 3030;

// Defining Axios Defaults
axios.defaults.baseURL = `http://localhost:${port}`;
axios.defaults.headers.post["Content-Type"] = "application/json; charset=utf-8";
// axios.defaults.headers['Access-Control-Allow-Origin'] = '*'
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
  console.log("Show Prod");
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
  console.log("Generating ID .....");
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
  };

  //Event Listener On Delete Button To Delete 1 Product  from the  Products List and HTML
  deleteBTN.onclick = () => {
    var productId;
    prod = products.filter((product) => product.name == productName.innerText);
    productId = prod[0].id;

    deleteProduct(productId);
    init(); // Load All Page Func Again
  };

  //Event Listener On Edit Button To Edit Existing Product
  editBTN.onclick = () => {
    product = products.filter(
      (product) => product.name == productName.innerText
    );
    var prodOBJ = editBTN.parentNode.parentNode;
    editProduct(prodOBJ, product);
  };
}








  // Delete Product From Server
  const deleteProduct = async (productId) => {
    console.log(productId);
    await axios.delete(`/products/${productId}`).then((r) => r.data);
    console.log("Deleted");
  };


// Edit Product From Server, ID Cannot Be Changed
const editProduct = async (prodOBJ, product) => {
    console.log("Editing Task");
    console.log("ProdOBJ", prodOBJ);
    console.log("Product", product);
    name = prompt("Choose New Product Name")
    price = prompt("Choose New product Price") 
    amount = prompt("Choose New Product Amount")
  
    // Need To Add Not Finished Edit Mode
    /**
     * let containsClass = prodOBJ.classList.contains("editMode");
     * if (!containsClass) {
     * prodOBJ.classList.add("editMode");
     * event.target.innerHTML = "Save";}
     * else {
     * prodOBJ.classList.remove("editMode");
     * }
    */
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
  