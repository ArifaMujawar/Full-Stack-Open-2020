require("dotenv").config();

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI
console.log('Port is ', PORT);
module.exports ={
  MONGODB_URI, PORT
}