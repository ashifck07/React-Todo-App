const express = require('express'); 
const cors = require('cors');

require('dotenv').config(); 

const dbConnect = require('./dbConnection');

const routes = require('./Routes/Route')

//env to connect
const port = process.env.PORT;
dbConnect();

//Execute express 
const app = express(); 

//Middlewares
app.use(express.json()); 
app.use(cors()); 
app.use("/todo",routes)



app.listen(port, () => console.log(`Server is running on port ${port}`)); 
