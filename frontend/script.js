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
}

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