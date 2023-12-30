const mongoose = require("mongoose");
const mongoUrl = "mongodb://localhost:27017";


const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoUrl, {});
    console.log("Successfully connected");
  } catch (error) {
   ( console.log("Error to Conncecting MongoDb"),error)
  }
};

module.exports = connectToMongo;
