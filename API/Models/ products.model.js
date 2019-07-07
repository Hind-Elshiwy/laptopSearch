const mongoose = require('mongoose'),
  

 productsSchema = new mongoose.Schema({
    Company: { type: String},
    Product: {type: String },
    Type: { type: String},
    Inches: {type: Number},
    Resolution: {type: String},
    CPU: {type: String },
    RAM: {type: String},
    Memory: {type: String},
    Graphics: {type: String },
    OpSys: { type: String},
    Weight: {type: String },
    Price: { type: Number },
});


module.exports =  mongoose.model('products', productsSchema);

