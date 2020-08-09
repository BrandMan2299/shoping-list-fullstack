//Global Env
// const products = document.getElementById("products");

//defaults
port = 3000;
axios.defaults.baseURL = `http://localhost:${port}`;
axios.defaults.headers.post["Content-Type"] = "application/json; charset=utf-8";
axios.defaults.validateStatus = (status) => status >= 200 && status < 300;
const defaultImgSrc = `images/nophoto.jpg`

function init() {
  createBag();
}

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

const createBag = async (array) => {
  console.log("createBage");
  array = await getList();
  array.forEach((product) => {
    addProductToHtml(product);
  });
};

function addProductToHtml(product) {
  console.log("addProductHTML");
  let newProduct = document.createElement("div");
  newProduct.className = "product";
  products.appendChild(newProduct);

  var buttons = document.createElement("div");
  buttons.className = "buttons";
  newProduct.appendChild(buttons);


  //Product Buttons
  var deleteButton = document.createElement("span");
  deleteButton.className = "delete-btn";
  deleteButton.innerHTML = `<ion-icon name="trash-outline"></ion-icon>`;
  buttons.appendChild(deleteButton);

  var likeButton = document.createElement("span");
  likeButton.className = "like-btn";
  likeButton.innerHTML = ` <ion-icon name="heart-outline"></ion-icon>`;
  buttons.appendChild(likeButton);


  var productIMG = document.createElement("div");
  productIMG.className = "image";
  newProduct.appendChild(productIMG)
  
  imgSrc = `images/${product.name}.jpg`
  var img = document.createElement("img")
  img.src = (checkImage(imgSrc)) ? imgSrc: defaultImgSrc;
  img.alt ="";
  productIMG.appendChild(img)

  
}


function checkImage(image_url){

    var http = new XMLHttpRequest();

    http.open('HEAD', image_url, false);
    http.send();

    console.log(http.status)
    return http.status != 404;

}