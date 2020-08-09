//Global Env
// const products = document.getElementById("products");

//defaults
port = 3000;
axios.defaults.baseURL = `http://localhost:${port}`;
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
axios.defaults.validateStatus = status => status >= 200 && status < 300;

function init()
{
    createBag();
}
const getList = async () => {
    try {
        const {data} = await axios.get(`/products`)
        console.log("Products Data", data)
        return(data)
    } catch(e) {
        console.log("Error Getting Products")
        console.log(e)
    }
}



const createBag = async (array) => {
    array = await getList()
    array.forEach(product => {
        addProductToHtml(product);
    });
}

function addProductToHtml(product) {
    var newProduct = document.createElement("li");
    newProduct.className ="product";
    products.appendChild(newProduct)

}