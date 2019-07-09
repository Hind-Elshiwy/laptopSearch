let express = require("express");

let userRoutes = express.Router();

const authenticate = require("../middleware/jwt");

let User = require("../Models/user.model"),
    userController = require("../controllers/user");

userRoutes.post("/signup", userController.signUp)

userRoutes.post("/signin", userController.signIn);

userRoutes.use(authenticate);
userRoutes.get("", userController.getUser);
module.exports = userRoutes;