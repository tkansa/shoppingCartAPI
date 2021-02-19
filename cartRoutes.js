const express = require('express');
const shoppingCart = express.Router();

const items = [
    { id: 1, product: "apple", price: 1.5, quantity: 2 },
    { id: 2, product: "pear", price: 2.75, quantity: 3 },
    { id: 3, product: "banana", price: 3, quantity: 5 },
]

shoppingCart.get("/", (req, res) => {

    let filteredItems = items;
    let maxPrice = parseFloat(req.query.maxPrice);
    if (maxPrice) {
        filteredItems = items.filter(i => i.price <= parseInt(req.query.maxPrice));
    }
    if (req.query.prefix) {
        filteredItems = items.filter(i => i.product.startsWith(req.query.prefix));
    }
    if (req.query.pageSize) {
        filteredItems = items.slice(0, parseInt(req.query.pageSize));
    }

    res.json(filteredItems);

});

shoppingCart.get("/:id", (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) {
        res.status(404).send(`There is no item with the id: ${req.params.id}`);
    }
    res.json(item);
});

shoppingCart.post("/", (req, res) => {
    const item = {
        id: items.length + 1,
        product: req.body.product,
        price: parseFloat(req.body.price),
        quantity: parseInt(req.body.quantity)
    }

    items.push(item);
    res.status(201);
    res.json(item);
});

shoppingCart.put("/:id", (req, res) => {

    // get the index of the item
    const index = items.findIndex(i => i.id === parseInt(req.params.id));

    if (index != 0 && !index) {
        res.status(404).send(`There is no item with the id: ${req.params.id}`);
    }

    // use that to edit the item with the new values from the req.body
    items[index].product = req.body.product;
    items[index].price = parseFloat(req.body.price);
    items[index].quantity = parseInt(req.body.quantity);

    // alternative way - using splice
    // let newItem = {
    //     id: parseInt(req.params.id),
    //     product: req.body.product,
    //     price: req.body.price,
    //     quantity: req.body.quantity

    // }
    //items.splice(index, 1, newItem);
    //res.json(newItem);

    //return it
    res.status(201);
    res.json(items[index]);
});

shoppingCart.delete("/:id", (req, res) => {
    const index = items.findIndex(i => i.id === parseInt(req.params.id));
    items.splice(index, 1);
    res.status(204);
    res.json();

});

module.exports = shoppingCart;