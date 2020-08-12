//Icons
const deleteIcon = `<ion-icon name="trash-outline"></ion-icon>`
const likeIcon = `<ion-icon name="heart-outline"></ion-icon>`
const minusIcon = `<ion-icon name="remove-circle-outline"></ion-icon>`
const plusIcon = `<ion-icon name="add-circle-outline"></ion-icon>`
const editIcon = `<i class="fal fa-edit"></i>`


// Product Object Creation
function Product(_id, _name, _price, _amount, _parent) {
    this.id = _id;
    this.name = _name;
    this.price = _price;
    this.amount = _amount;
    this.parent = _parent;
  }