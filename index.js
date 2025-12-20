const express = require("express");
const dbSangaConnection = require("./database/connection");
const User = require("./models/userModel");
const Blog = require("./models/blogModel");
const app = express();
const bcrypt = require("bcrypt")

dbSangaConnection();

app.use(express.json());
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
    password: bcrypt.hashSync(password,10)  // 10 = salt 
  });
  res.json({
    msg: "data created successfully...",
  });

  console.log(name, email, password);
});


 
app.delete("/delete", async function(req,res){
    const id = req.body.id
    await User.findByIdAndDelete(id)
        res.json({
            msg : "user deleted successfully.."
        })
})

app.patch("/patch", async function(req,res){
    const email = req.body.email
    await User.updateOne({email : email})
    res.json({
            msg : "hariom fucked successfully..."
        })

    console.log("Hi")

})

// homework blog create delete:::::

app.post("/blog/register", async function(req, res) {
  const { title, subtitle, description } = req.body;
  await Blog.create({
    title: title,
    subtitle: subtitle,
    description:description  
  });
  res.json({
    msg: "data created successfully...",
  });

  console.log(title, subtitle, description);
});
app.delete("/blog/delete", async function(req,res){
    const id = req.body.id
    await Blog.findByIdAndDelete(id)
        res.json({
            msg : "blog deleted successfully.."
        })
})


app.listen(8080, function () {
  console.log("server has started at port 8080");
});
//create table named Blog in other file->keep title,subtitle,description


