const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String, requred: true
    },
    email: {
        type: String, requred: true
    },
    password: {
        type: String, requred: true
    },
    blogs: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Blog"
        }
    ]
}, { timestamps: true });


module.exports = mongoose.model('User', userSchema);