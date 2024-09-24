const mongoose = require('mongoose');
const mongoURL = "mongodb://localhost:27017/iNotebook";

const connectToMongo = async()=>{
   const con = await mongoose.connect(mongoURL);
   console.log("connected to mongodb srever...");
}

module.exports = connectToMongo;