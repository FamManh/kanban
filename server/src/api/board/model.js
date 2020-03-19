const mongoose = require("mongoose");
const httpStatus = require("http-status");
const APIError = require("../../utils/APIError");
const boardSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 128,
        trim: true,
        required: true
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User"
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
}, {timestamps: true});

/**
 * Statics
 */

boardSchema.statics = {
    /**
     * 
     * @param {ObjectId} id - the objectId of board
     * @return {Promise<Board, APIError}
     */
    async get(id){
        try{
            let board;
            if(mongoose.Types.ObjectId.isValid(id)){
                board = await this.findById(id)
                    .populate("owner", "email fullName avatar").exec();
            }
            if(board){
                return board;
            }

            throw new APIError({
                message: 'Board does not exists',
                status: httpStatus.NOT_FOUND
            })
        }catch(error){
            throw error
        }
    },

    list({
        currentUserId
    }){
        return this.find({ owner: currentUserId }).populate("owner", "email fullName");
    }
}

/**
 * Method
 */
boardSchema.method({
    transform() {
        let transformed = {};
        const fields = ["id", "name", "owner", "colors"];

        fields.forEach(field => {
            transformed[field] = this[field];
        });
        return transformed;
    }
});

module.exports = new mongoose.model("Board", boardSchema);
