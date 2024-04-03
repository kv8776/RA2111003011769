require('dotenv').config(); // to Load environment variables from .env file
const axios = require('axios');
const testApiFetcher = async (company, category, top, minPrice, maxPrice) => {
    try {
        const token = process.env.TOKEN;
        const url = `http://20.244.56.144/test/companies/${company}/categories/${category}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
        const response = await axios.get(url, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (err) {
        console.error("Error in fetching details bro", err);
        throw err;
    }
}

module.exports = testApiFetcher;
