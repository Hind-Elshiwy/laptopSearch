let express = require("express"),
    mongoose = require("mongoose"),
    bcrypt = require('bcryptjs');

let userRoutes = express.Router();

const authenticate = require("../middleware/jwt");

let User = require("../Models/user.model");


userRoutes.post("/signup", (request, response, next) => {
    console.log(request.body);
    let user = {
        name: request.body.name,
        email: request.body.email,
        password: request.body.password
    };
   
    user = new User(user);
    user.save((err, user) => {
        if (!err) {
            response.status(200).json({ "token": user.generateJwt() });
        } else {
            console.log(err);
            if (err.code == 11000)
                response.status(422).send(['Email already exist']);
            else
                return next(err);
        }
    })
})

userRoutes.post("/signin", (req, res) => {
    console.log(req.body);
    User.findOne({ email: req.body.email },
        (err, user) => {
            if (err)
                res.status(404).json(err);
            // unknown user
            else if (!user)
                res.status(401).json({ message: 'No such account' });
            // wrong password
            else if (!user.verifyPassword(req.body.password))
                res.status(401).json({ message: 'Wrong password' });
            // authentication succeeded
            else
                res.status(200).json({ "token": user.generateJwt() });
        });
});

userRoutes.use(authenticate);
userRoutes.get("", (req, res) => {
    User.findById(req._id, (err, user) => {
        if (err) {
            console.log(err);
            res.status(404).send(err);
        }
        else {
            res.status(200).send(user);
        }
    })
});

// userRoutes.put("", upload.single("avatar"), (req, res, next) => {
//     console.log(req.file);
//     if (req.file) {
//         req.body.avatar = req.file.path;
//     }
//     console.log(req.body);
//     User.update({ _id: req._id },
//         req.body, err => {
//             if (!err) {
//                 User.findById(req._id, (err, result) => {

//                     if (!err) {
//                         console.log(result);
//                         res.status(200).send(result);
//                     }
//                     else {
//                         console.log(err);
//                         return next(err);
//                     }
//                 })
//             }
//             else {
//                 console.log(err);
//                 return next(err);
//             }
//         })
// })
module.exports = userRoutes;