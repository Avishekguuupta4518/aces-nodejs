const express = require("express");
const dbSangaConnection = require("./database/connection");
const {homePage, aboutPage, fetchBlog, register, fetch_userID, userDelete, userUpdate, blogRegister, blogDelete, fetchBlogId, updatedBlogById, updatedBlog, updateUser, login, fetchUser} = require("./controller/userController");
const cookieParser=require("cookie-parser")
require("dotenv").config();

dbSangaConnection();

const app = express();

app.use(express.json()); // middleware
app.use(cookieParser());

app.get("/",homePage)
app.get("/about", aboutPage)
app.get("/fetch-users", fetchUser)
app.get("/fetch-blogs", fetchBlog)
app.post("/register", register)
app.get("/fetch-user/:id", fetch_userID)
app.delete("/delete", userDelete)
app.patch("/patch", userUpdate)
app.post("/blog/register", blogRegister)
app.delete("/blog/delete", blogDelete)
app.get("/fetch-blog/:id", fetchBlogId)
app.patch("/update-blog/:id",updatedBlogById)
app.patch("/update-blog",updatedBlog)
app.patch("/update-user", updateUser)
app.post("/login", login)


app.listen(process.env.PORT, function () {
  console.log("server has started at port 8080");
});