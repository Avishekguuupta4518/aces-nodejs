const User = require("../models/userModels");
const Blog = require("../models/blogModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
async function homePage(req, res) {
  res.json({
    name: "Home Page",
  }); //if its not here no response will be sent...buffering continues
}

async function aboutPage(req, res) {
  res.json({
    address: "About us address",
    age: 23,
    name: "Avishek Gupta",
  });
}


async function fetchUser(req, res) {
  const data = await User.find();
  res.json({
    data: data, //should be the variable name or just data and do the same for blog
  });
}

async function fetchBlog(req, res) {
  const blog = await Blog.find();
  res.json({
    blog : blog,
  });
}

async function register(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name: name,
    email: email,
    password: bcrypt.hashSync(password, 10) // 10 = salt
  });
  res.json({
    msg: "data created successfully...",
  });
}

async function fetch_userID(req, res) {
  const id = req.params.id;
  const data = await User.findById(id).select(["-password", "-email", "-__v"]);
  res.json({
    msg: "id found",
    data: data,
  });
}

async function userDelete(req, res) {
  const id = req.body.id;
  await User.findByIdAndDelete(id);
  res.json({
    msg: "user deleted successfully..",
  });
}

async function userUpdate(req, res) {
  const email = req.body.email;
  await User.updateOne({ email: email });
  res.json({
    msg: "user updated successfully...",
  });
}

// homework blog create & delete..

async function blogRegister(req, res) {
  const { title, subtitle, description } = req.body;
  await Blog.create({
    title: title,
    subtitle: subtitle,
    description: description,
  });
  res.json({
    msg: "data created successfully...",
  });
}

async function blogDelete(req, res) {
  const id = req.body.id;
  await Blog.findByIdAndDelete(id);
  res.json({
    msg: "blog deleted successfully..",
  });
}

async function fetchBlogId(req, res) {
  const id = req.params.id;
  const data = await Blog.findById(id).select(["-title", "-subtitle"]);
  res.json({
    msg: "id found",
    data: data,
  });
}

async function updatedBlogById(req, res) {
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
}

async function updatedBlog(req, res) {
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
}

async function updateUser(req, res) {
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
}


async function login(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const data = await User.findOne({ email: email });
  console.log(data);

  if (!data)
    res.json({
      msg: "User bhetena",
    });
  else {
    const result = bcrypt.compareSync(password, data.password);
   
    if (result) {
      const token = jwt.sign(
        {name:"gupta"},
        process.env.JWT_KEY,
        {expiresIn: "1h"}
      );

      console.log(token);
      res.cookie("token", token, (httpOnly = true));
      return res.json({
        msg:"login vayo"
      })
    } else {
      res.json({
        msg: "Bhayena muji fheri try gar",
      });
    }
  }
}

module.exports = {
  homePage,
  aboutPage,
  fetchBlog,
  fetchBlogId,
  fetchUser,
  fetch_userID,
  userDelete,
  userUpdate,
  blogDelete,
  blogRegister,
  updateUser,
  updatedBlog,
  updatedBlogById,
  register,
  login,
};
