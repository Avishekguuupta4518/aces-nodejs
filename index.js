const express = require("express");
const dbSangaConnection = require("./database/connection");
const User = require("./models/userModel");
const Blog = require("./models/blogModel");
const app = express();
const bcrypt = require("bcrypt");
require("dotenv").config()

dbSangaConnection();

app.use(express.json()); // middleware

app.get("/", function (req, res) {
  /*get is a method here "/"  is route/api...can be named anything..
    request,response is a format */
  res.json({
    name: "Home Page",
  }); //if its not here no response will be sent...buffering continues
});

app.get("/about", function (req, res) {
  //routing by/about
  res.json({
    address: "About us address",
    age: 23,
    name: "Avishek Gupta",
  });
});

app.get("/fetch-users", async function (req, res) {
  //response to user table ma vako user data sent garnu parxa
  const data = await User.find();
  res.json({
    data: data, //should be the variable name or just data and do the same for blog
  });
});

app.get("/fetch-blogs", async function (req, res) {
  const blog = await Blog.find();
  res.json({
    blog,
  });
});
//if database is MongoDb then mongoose is your ORM tool....to check it go to your package json

app.post("/register", async function (req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name: name,
    email: email,
    password: bcrypt.hashSync(password, 10), // 10 = salt
  });
  res.json({
    msg: "data created successfully...",
  });

  console.log(name, email, password);
});

app.get("/fetch-user/:id", async function (req, res) {
  const id = req.params.id;
  const data = await User.findById(id).select(["-password", "-email", "-__v"]);
  res.json({
    msg: "id found",
    data: data,
  });
});

app.delete("/delete", async function (req, res) {
  const id = req.body.id;
  await User.findByIdAndDelete(id);
  res.json({
    msg: "user deleted successfully..",
  });
});

app.patch("/patch", async function (req, res) {
  const email = req.body.email;
  await User.updateOne({ email: email });
  res.json({
    msg: "user updated successfully...",
  });
});

// homework blog create & delete..

app.post("/blog/register", async function (req, res) {
  const { title, subtitle, description } = req.body;
  await Blog.create({
    title: title,
    subtitle: subtitle,
    description: description,
  });
  res.json({
    msg: "data created successfully...",
  });
});

app.delete("/blog/delete", async function (req, res) {
  const id = req.body.id;
  await Blog.findByIdAndDelete(id);
  res.json({
    msg: "blog deleted successfully..",
  });
});

app.get("/fetch-blog/:id", async function (req, res) {
  const id = req.params.id;
  const data = await Blog.findById(id).select(["-title", "-subtitle"]);
  res.json({
    msg: "id found",
    data: data,
  });
});

app.patch("/update-blog/:id", async function (req, res) {
  const id = req.params.id;
  const data = await Blog.findByIdAndUpdate(
    id,
    {
      subtitle: " c++",
    },
    { new: true }
  );
  res.json({
    msg: "i",
    data: data,
  });
});

app.patch("/update-blog", async function (req, res) {
  const id = req.body.id;
  const data = await Blog.findByIdAndUpdate(
    id,
    {
      subtitle: req.body.subtitle,
      title: req.body.title,
      description: req.body.description,
    },
    { new: true }
  );
  res.json({
    msg: "blog updataed successfully..",
    data: data,
  });
});

app.patch("/update-user", async function (req, res) {
  const updaeObj = {};
  if (req.body.name) {
    updaeObj.name = req.body.name;
  }
  if (req.body.email) {
    updaeObj.email = req.body.email;
  }
  if (req.body.password) {
    updaeObj.password = req.body.password;
  }
  const data = await User.findByIdAndUpdate(req.body.id, updaeObj, {
    new: true,
  });
  res.json({
    msg: "user updated successfully",
    data: data,
  });
});

app.listen(process.env.PORT, function () {
  console.log("server has started at port 8080");
});
//create table named Blog in other file->keep title,subtitle,description


//login 



app.post("/login", async function (req,res) {
  const email = req.body.email
  const password = req.body.password
  const data = await User.findOne({email:email}) 
  console.log(data) 
  if(!data)
    res.json({
  msg :"User bhetena"})
else{
  const result = bcrypt.compareSync(password, data.password)
  if(result){
    res.json({
      msg : "Login vayo"
    })
  }else{
    res.json({
      msg : "vayena "
    })
  }
}
})

