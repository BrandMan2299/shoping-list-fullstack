function Product(_id,_name,_price,_amount,_parent) {
    this.id = _id,
    this.name = _name,
    this.price =_price,
    this.amount = _amount,
    this.parent = _parent
}

Product.prototype.addToHtml = function(){
    var newBox = document.createElement("div");
    newBox.className = "col-5 border border-grey mx-2";
    this.parent.appendChild(newBox);

    newBox.innerHTML += "<h2>"+this.name+"</h2>";
    newBox.innerHTML += "<div>Price:"+this.price+" nis</div>";
    newBox.innerHTML += "<div>Amount:"+this.amount+" items</div>";
}

// Product.prototype.addToHtml = function(){
    
//     console.log("addProductHTML");
//     let newProduct = document.createElement("div");
//     newProduct.className = "product";
//     products.appendChild(newProduct);
    
//     var buttons = document.createElement("div");
//     buttons.className = "buttons";
//     newProduct.appendChild(buttons);
    
//     //Product Buttons
//     var deleteButton = document.createElement("span");
//     deleteButton.className = "delete-btn";
//     deleteButton.innerHTML = `<ion-icon name="trash-outline"></ion-icon>`;
//     buttons.appendChild(deleteButton);
    
//     var likeButton = document.createElement("span");
//     likeButton.className = "like-btn";
//     likeButton.innerHTML = `<ion-icon name="heart-outline"></ion-icon>`;
//     buttons.appendChild(likeButton);
    
//     var productIMG = document.createElement("div");
//     productIMG.className = "image";
//     newProduct.appendChild(productIMG);
    
//     imgSrc = `css/images/${product.name}.jpg`;
//     var img = document.createElement("img");
//     img.src = checkImage(imgSrc) ? imgSrc : defaultImgSrc;
//     img.alt = "";
//     productIMG.appendChild(img);
    
//     var quantity = document.createElement("div");
//     quantity.className = "quantity";
//     newProduct.appendChild(quantity);
    
//     var input = document.createElement("input");
//     input.type = "text";
//     input.name = "name";
//     input.value = "0";
//     quantity.appendChild(input);
    
//     minusButton = document.createElement("button");
//     minusButton.name = "button";
//     minusButton.type = "button";
//     minusButton.innerHTML = `<ion-icon name="remove-circle-outline"></ion-icon>`;
//     quantity.appendChild(minusButton);
    
//     plusButton = document.createElement("button");
//     plusButton.name = "button";
//     plusButton.type = "button";
//     plusButton.innerHTML = `<ion-icon name="add-circle-outline"></ion-icon>`;
//     quantity.appendChild(plusButton);
// }




  