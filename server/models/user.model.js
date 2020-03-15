const mongoose = require('mongoose')

const userRoles = ['user', 'admin'];

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        maxlength: 48,
        unique: true
    },
    password: {
        type: String
    },
    fullName: {
        type: String,
        maxlength: 50
    },
    avatar: String,
    role: {
        type: String, default: 'user'
    }
})

module.exports = new mongoose.model("User", userSchema);
