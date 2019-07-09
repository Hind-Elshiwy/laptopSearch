let express = require("express"),
    productController = require("../controllers/product"),
    mongoose = require("mongoose");

const authenticate = require("../middleware/jwt");
let productsRoutes = express.Router();
productsRoutes.use(authenticate);
productsRoutes.get("", productController.getProducts)

module.exports = productsRoutes;