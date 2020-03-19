const mongoose = require("mongoose");

const columnSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            maxlength: 128,
            trim: true,
            required: true
        },
        description: {
            type: String,
            maxlength: 2000,
            trim: true
        },
        taskProperties: {
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
        },
        boardId: {
            type: mongoose.Types.ObjectId,
            ref: "Board"
        }
    },
    { timestamps: true }
);

/**
 * Statics
 */

columnSchema.statics = {
    /**
     *
     * @param {ObjectId} id - the objectId of column
     * @return {Promise<Column, APIError}
     */
    async get(id) {
        try {
            let column;
            if (mongoose.Types.ObjectId.isValid(id)) {
                column = await this.findById(id)
                    .populate("boardId", "name")
                    .exec();
            }
            if (column) {
                return column;
            }

            throw new APIError({
                message: "Column does not exists",
                status: httpStatus.NOT_FOUND
            });
        } catch (error) {
            throw error;
        }
    },

    list({ boardId }) {
        return this.find({ boardId: boardId }).populate("boardId", "name");
    }
};

/**
 * Method
 */
columnSchema.method({
    transform() {
        let transformed = {};
        const fields = [
            "id",
            "name",
            "description",
            "taskProperties",
            "boardId"
        ];

        fields.forEach(field => {
            transformed[field] = this[field];
        });
        return transformed;
    }
});

module.exports = new mongoose.model("Column", columnSchema);