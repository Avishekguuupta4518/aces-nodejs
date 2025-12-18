// import express from 'expreess'

const express = require("express");
const app = express();

app.get("/", function (req, res) {
  // get, post, put, patch, delete
  res.json({
    name: "home page",
  });
});

app.get("/about", function (req, res) {
  // "/" = route /API
  res.json({
    address: "Dharan",
    age: 25,
    name: "Ram",
  });
});

app.listen(3000, function () {
  // 3000 = port number ,  callback function
  console.log("Server has strated at port 3000");
});
