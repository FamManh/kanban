const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 24,
        trim: true,
        required: true
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    members: {
        type: Array
    },
    colors: [
        {
            color: String,
            name: String
        }
    ]
        
    
});

module.exports = new mongoose.model("Board", boardSchema);
