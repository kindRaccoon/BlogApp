const Blog = require('../models/Blog');
const User = require('../models/User');
const mongoose = require('mongoose');


//Create Blog
exports.createBlog = async (req, res) => {
    try {
        const { title, description, image, user } = req.body;

        if (!title || !description || !image || !user) {
            return res.status(400).send({
                success: false,
                message: "Provide All Fields",
            })
        }

        const existingUser = await User.findById(user);

        if (!existingUser) {
            return res.status(400).send({
                success: false,
                message: "User Not Found",
            })
        }

        const newBlog = new Blog({ title, description, image, user });
        // const session = await mongoose.startSession();
        // session.startTransaction();
        // await newBlog.save({ session });
        await newBlog.save();
        existingUser.blogs.push(newBlog);
        await existingUser.save()
        // await session.commitTransaction()

        res.status(200).send({
            success: true,
            message: "New Blog Created",
            newBlog
        })

    } catch (err) {
        res.status(500).send({
            success: false,
            message: "Error Creating Blog",
            err
        })
    }
}


//Get All Blogs
exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('user');

        res.status(200).send({
            success: true,
            BlogCount: blogs.length,
            message: "Blogs List",
            blogs
        })
    } catch (err) {
        res.status(500).send({
            success: false,
            message: "Error Getting Blogs",
            err
        })
    }
}

//Single Blog
exports.getBlog = async (req, res) => {
    try {
        const Id = req.params.id;
        const blog = await Blog.findById(Id);

        if (!blog) {
            return res.status(500).send({
                success: false,
                message: "Blog Not Found"
            })
        }

        res.status(200).send({
            success: true,
            message: "Single Blog Found",
            blog
        })

    } catch (err) {
        res.status(400).send({
            success: false,
            message: "Error Getting Single Blog",
            err
        })
    }
}

//Update Blog
exports.updateBlog = async (req, res) => {
    try {
        const Id = req.params.id;
        const { title, description, image } = req.body;

        const blog = await Blog.findByIdAndUpdate(Id,
            { ...req.body },
            { new: true }
        );

        res.status(200).send({
            success: true,
            message: "Blog Successfully Updated",
            blog
        })
    } catch (err) {
        res.status(400).send({
            success: false,
            message: "Error Updating Blog",
            err
        })
    }
}


//Delete Blog
exports.deleteBlog = async (req, res) => {
    try {

        const blog = await Blog.findOneAndDelete(req.params.id).populate("user");
        await blog.user.blogs.pull(blog);
        await blog.user.save();

        res.status(200).send({
            success: true,
            message: "Blog Successfully Deleted"
        })

    } catch (err) {
        res.status(500).send({
            success: false,
            message: "Error Deleting Blog",
            err
        })
    }
}

//Get User Blog
exports.userBlog = async (req, res) => {
    try {
        const userBlog = await User.findById(req.params.id).populate('blogs');

        if (!userBlog) {
            return res.status(500).send({
                success: false,
                message: "User Blog Not Found"
            })
        }

        res.status(200).send({
            success: true,
            message: "User Blogs Founded",
            userBlog
        })

    } catch (err) {
        res.status(400).send({
            success: false,
            message: "Error Getting User Blog",
            err
        })
    }
}