port = 3030;

axios.defaults.baseURL = `http://localhost:${port}`;
axios.defaults.headers.post["Content-Type"] = "application/json; charset=utf-8";
axios.defaults.validateStatus = (status) => status >= 200 && status < 300;

const defaultImgSrc = `css/images/nophoto.jpg`;
const add_btn = document.getElementById("add_btn");
const id_name = document.getElementById("id_name");
const id_price = document.getElementById("id_price");
const id_amount = document.getElementById("id_amount");

NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
HTMLCollection.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];

var products = [];
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

window.onload = function () {
  showProd().then(() => {
    var id_parent = document.getElementById("id_parent");
    var boxes = id_parent.getElementsByClassName("productBox"); // HTML Collection
    Array.from(boxes).forEach((box) => {
      addBTNEvent(box);
    });
  });
  add_btn.onclick = function () {
    var obj = {
      name: id_name.value,
      id: generateID(),
      price: id_price.value,
      amount: id_amount.value,
    };
    pushProduct(obj);
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
  showProd();
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

function addBTNEvent (box) {
  console.log("Product Box", box)
  var buttonsElement = box.querySelector('.buttons')

  var minusBTN = buttonsElement.querySelector('.minus-button')
  
  var plusBTN = buttonsElement.querySelector('.plus-button')
  var editBTN = buttonsElement.querySelector('.edit-button')


  var deleteBTN = buttonsElement.querySelector('.delete-btn')


  var likeBTN = buttonsElement.querySelector('.like-btn')
  var prodAmount = box.querySelector('.amountInput');
  var prodPrice = box.querySelector('.productPrice')
  var productTitlePrice = prodPrice.querySelector('.productTitlePrice')
  var productPriceDiv = box.querySelector('.productPriceDiv')
  var productTotalPrice = productPriceDiv.querySelector('.productTotalPrice')
  var productName = box.querySelector('.productHeader')



  plusBTN.onclick = () => {
    var quantityNum = parseInt(prodAmount.value, 10);
    var prodPriceVal = parseInt(productTitlePrice.innerHTML, 10);
    
    var productTotalPriceVal = productTotalPrice.innerHTML
    quantityNum += 1
    prodAmount.value = quantityNum
    
    

    productTotalPrice.innerHTML = prodPriceVal * quantityNum
    console.log("prodAmount Value", prodAmount.value)
    console.log("FullPrice", productTotalPriceVal)

  }

  minusBTN.onclick = () => {
    var quantityNum = parseInt(prodAmount.value, 10);
    var prodPriceVal = parseInt(productTitlePrice.innerHTML, 10);
    
    var productTotalPriceVal = productTotalPrice.innerHTML
    quantityNum -= 1
    prodAmount.value = quantityNum
    
    

    productTotalPrice.innerHTML = prodPriceVal * quantityNum
    console.log("prodAmount Value", prodAmount.value)
    console.log("FullPrice", productTotalPriceVal)

  }

  deleteBTN.onclick =  () => {
    console.log(products)
    var productId
    prod = products.filter(product => product.name == productName.innerText);
    console.log(prod)
    productId = prod[0].id
    console.log(prod[0].id)
    // products.forEach( async (product) => {
    //   if (product.name == productName.innerText) {
    //     console.log(product.name, "IS Equal", productName.innerText)
    //     productId = product.id;
    //   }
      
    // })

    deleteProduct(productId);
    window.location.reload()
console.log(a)
    // deleteProduct()

  }
}




const deleteProduct = async (productId) => {
  console.log(productId);
  await axios.delete(`/products/${productId}`).then((r) => r.data);
  console.log("Deleted");

};


// app.put("/products/:id", (req, res) => {
//   products.forEach((product, index) => {
//     if (product.id === req.params.id) {
//       products.splice(index, 1, req.body);
//       res.send(req.body);
//     }
//   });
// });
