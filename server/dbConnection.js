const mongoose = require('mongoose')

const connectionString = process.env.CONNECTION_STRING;


const dbConnection = async()=>{
    try{
        await mongoose.connect(connectionString);
        console.log("mongodb connected succesfully");
    }
    catch(error){
        console.log(error);
    }
}
module.exports = dbConnection;
