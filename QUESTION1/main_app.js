const express = require('express');
const productsRouter = require('./routes/products');
const dotenv = require('dotenv');
//to store confidential data
dotenv.config();

const app = express();
console.log(process.env.PORT);
const port = process.env.PORT || 3000;

app.use('/categories', productsRouter);
//to get known if server started
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
