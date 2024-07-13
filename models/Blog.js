const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String, requred: true
    },
    description: {
        type: String, requred: true
    },
    image: {
        type: String, requred: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        requred: true
    }
}, { timestamps: true });


module.exports = mongoose.model('Blog', blogSchema);