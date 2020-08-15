//Icons
const deleteIcon = `<ion-icon name="trash-outline"></ion-icon>`;
const likeIcon = `<ion-icon name="heart-outline"></ion-icon>`;
const minusIcon = `<ion-icon name="remove-circle-outline"></ion-icon>`;
const plusIcon = `<ion-icon name="add-circle-outline"></ion-icon>`;
const editIcon = `<i class="fal fa-edit"></i>`;

// Product Object Creation
function Product(_id, _name, _price, _amount, _parent) {
  this.id = _id;
  this.name = _name;
  this.price = _price;
  this.amount = _amount;
  this.parent = _parent;
}

// Adding Product to HTML Function

Product.prototype.addToHtml = function () {
  productHeader = document.createElement("h2");
  productHeader.className = "productHeader";
  productHeader.innerHTML = this.name;

  productPrice = document.createElement("div");
  productPrice.className = "productPrice";
  productPrice.innerHTML = `Price: <span class="productTitlePrice">${this.price}</span> NIS`;

  var imgSrc = `/frontend/css/images/${this.name}.jpg`;
  imgSrc = checkImage(imgSrc) ? imgSrc : defaultImgSrc;
  var productIMG = document.createElement("div");
  productIMG.className = "image";
  productIMG.innerHTML += `<img src=${imgSrc} alt=""> <img>`;

  var quantity = document.createElement("div");
  quantity.className = "quantity";
  quantity.innerHTML = `<input type="text" value=${this.amount} class="amountInput">`;

  var productPriceDiv = document.createElement("div");
  productPriceDiv.className = "productPriceDiv";
  productPriceDiv.innerHTML = `Total Price: <span class="productTotalPrice">${
    this.price * this.amount
  }</span> NIS`;

  var editLabel = document.createElement("label");
  editLabel.className = "";

  var buttons = document.createElement("div");
  buttons.className = "buttons";

  //Product Buttons
  var deleteButton = document.createElement("span");
  deleteButton.className = "delete-btn";
  deleteButton.innerHTML = `${deleteIcon}`;

  var likeButton = document.createElement("span");
  likeButton.className = "like-btn";
  likeButton.innerHTML = `${likeIcon}`;

  var minusButton = document.createElement("button");
  minusButton.name = "button";
  minusButton.type = "button";
  minusButton.className = "minus-button";
  minusButton.innerHTML = `${minusIcon}`;

  var plusButton = document.createElement("button");
  plusButton.name = "button";
  plusButton.type = "button";
  plusButton.className = "plus-button";
  plusButton.innerHTML = `${plusIcon}`;

  var editButton = document.createElement("button");
  editButton.name = "button";
  editButton.type = "button";
  editButton.className = "edit-button";
  editButton.innerHTML = `Edit`;

  buttons.appendChild(editButton);
  buttons.appendChild(deleteButton);
  buttons.appendChild(likeButton);
  buttons.appendChild(minusButton);
  buttons.appendChild(plusButton);

  var newBox = document.createElement("div");
  newBox.className = "col-5 border border-grey mx-2 productBox";
  newBox.setAttribute("id", `product${this.id}`);

  newBox.appendChild(productHeader);
  newBox.appendChild(productPrice);
  newBox.appendChild(productIMG);
  newBox.appendChild(quantity);
  newBox.appendChild(productPriceDiv);
  newBox.appendChild(editLabel);
  newBox.appendChild(buttons);

  this.parent.appendChild(newBox);
};


// If The Image is not existing Use Default Image (NO Image Photo)
function checkImage(image_url) {
  var xhr = new XMLHttpRequest();
  try {
    xhr.open("HEAD", image_url, false);
    xhr.send();

    console.log(xhr.status);
    return xhr.status != 404;
  } catch (e) {
    console.log("Image Error", e);
  }
}
