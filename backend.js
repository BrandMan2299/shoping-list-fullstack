const express = require('express');
const app = express();
app.use(express.json());

let products = [
    {
        id:'0',
        name: 'milk',
        price: '10'
    },
    {
        id:'1',
        name: 'cerial',
        price: '23'
    },
    {
        id:'2',
        name: 'watermellon',
        price: '29'
    },
    {
        id:'3',
        name: 'cola',
        price: '12'
    },
    {
        id:'4',
        name: 'bread',
        price: '8'
    }
];

app.get('/products', (req, res) => {
    res.send(products);
})

app.get('/products/:id', (req, res) => {
    for (const product of products) {
        if(product.id === req.params.id)
        {
            res.send(product);
        }
    }
})

app.post('/products', (req, res) => {
    products.push(req.body);
    res.send(req.body);
})

app.put('/products/:id', (req, res) => {
    products.forEach((product ,index) => {
        if(product.id === req.params.id){
            products.splice(index, 1, req.body);
            res.send(req.body);
        }
    });
})

app.delete('/products/:id', (req, res) => {
    products.forEach((product ,index) => {
        if(product.id === req.params.id){
            products.splice(index, 1);
            res.send('Product deleted')
        }
    });
})

app.listen(2000);