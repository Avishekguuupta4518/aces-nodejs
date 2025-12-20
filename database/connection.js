const mongoose = require("mongoose");

async function dbSangaConnection() {
  //camelcase->first word small ,next word first letter capital
  await mongoose.connect(
    "mongodb+srv://gupavishek00000_db_user:7gaNMf5SOVVJ8D9N@cluster0.sgnsblb.mongodb.net/myDb"
  );
  console.log("DB connected successfully !!!");
  //async ->to use await use async in function name
  //await->to give the response time to query
}
//to export a function
module.exports = dbSangaConnection;
