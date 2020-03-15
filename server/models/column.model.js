const mongoose = require("mongoose");

const columnSchema = new mongoose.Schema({
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
    taskProperties: [
        {
            showDescription: {
                type: Boolean,
                default: true
            },
            showLabel: {
                type: Boolean,
                default: true
            },
            limitTaskCount: {
                type: Number,
                default: 0
            }
        }
    ],
    boardId: {
        type: mongoose.Types.ObjectId,
        ref: "Column"
    }
});

module.exports = new mongoose.model("Column", columnSchema);
