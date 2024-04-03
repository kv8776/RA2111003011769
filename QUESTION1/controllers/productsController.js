const testApi = require("../utils/testApi");
const { v4: uuidv4 } = require('uuid');


//here caching the response from products middleware to use in the product middle ware for reduing number of api calls
let storedProducts=null;//initially it is null
// Middleware function to get top products based on user options
module.exports.getTopProducts = async (req, res) => {
    
    const category = req.params.categoryname;
    const company = req.query.company;
    const pageLimit = req.query.n;
    const n = parseInt(pageLimit) || 10; // Default : 10 if user hasn't provided
    const maxPrice = req.query.maxPrice || 0;
    const minPrice = req.query.minPrice || 1000;
    const page = req.query.page || 1;
    try {
        const apiRes = await testApi(company, category, n, minPrice, maxPrice);
        const products = await apiRes.json();
        
        // Adding unique ids to response for each product 
        //here we can use even just numbers ,but i used uuid for more uniqueness
        const productsWithIds = products.map(p => ({
            ...p,
            id: uuidv4() 
        }));
        //storing them further use
        storedProducts=productsWithIds;//for further purpose
        // Pagination for the response
        const startInd = (page - 1) * n; // start index  for the page
        const paginated = productsWithIds.slice(startInd, startInd + n); // Get the products for the current page

        res.status(200).json(paginated); 
    } catch (err) {
        res.status(500).json({
            status: "failure",
            error: err.message 
        });
    }
}
//middleware to get specific product details from stored products
module.exports.productDetails=async(req,res)=>{
    const productId=req.params.productid;
    try{
        const product=storedProducts.find(p=>{
            if(p.id===productId) return p;
        });
        //in case if no product with that product id
        if(!productId){
            res.status(404).json({
                message:"product not found"
            })
        }
        res.status(200).json(product);
    }catch(err){
        console.log(err);
    }
    
}