const express = require('express');
const { getAllBlogs, getBlog, updateBlog, deleteBlog, createBlog, userBlog } = require('../controllers/blogController');

const router = express.Router();

//Create Blog
router.post("/create", createBlog);

//Get All Blogs
router.get("/all", getAllBlogs);

//Get Blog
router.get("/find/:id", getBlog);

//User Blog
router.get("/userblog/:id", userBlog);

//Update
router.put("/update/:id", updateBlog);

//Delete
router.delete("/delete/:id", deleteBlog);

module.exports = router;