const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
        trim: true,
        required: true
    },
    description: {
        type: String,
        maxlength: 50,
        trim: true,
        required: true
    },
    labels: [String],
    color: String,
    members: { type: mongoose.Types.ObjectId, ref: "User" },
    columnId: {
        type: mongoose.Types.ObjectId,
        ref: 'Column'
    }
});

module.exports = new mongoose.model("Task", taskSchema);
