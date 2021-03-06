let product= require("../Models/ products.model");

exports.getProducts = (req, res, next) => {
        // console.log("check");
        let labtops;
        // console.log(req.query);
        product.find({}, (err, result) => {
            if (!err) { 
                labtops = result
                if(req.query.q) {
                    q = req.query.q
                    // console.log(req.query.q)
                    labtops = result.filter(obj=> {
                        return (obj.Company.toLowerCase().includes(q.toLowerCase())) || (obj.Product.toLowerCase().includes(q.toLowerCase()))
                    })
                }
                if(req.query.filters) {
                    filters = req.query.filters
                    if(filters.cpu){
                        // console.log(filters)
                        labtops = labtops.filter(obj=> {
                            return (obj.CPU.includes(filters.cpu))
                        })
                    }
                    if(filters.ram){
                        labtops = labtops.filter(obj=> {
                            return (obj.RAM==filters.ram)
                        })
                    }
                    if(filters.opsys){
                        labtops = labtops.filter(obj=> {
                            return (obj.OpSys == filters.opsys)
                        })
                    }
                    if(filters.inches){
                        labtops = labtops.filter(obj=> {
                            return (obj.Inches == filters.inches)
                        })
                    }
                }
                if(req.query.q || req.query.filters){
                res.json(labtops)
                }
            }
            else {
                console.log(err);
                return next(err);
            }
        })
    }    