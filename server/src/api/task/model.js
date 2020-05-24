const mongoose = require("mongoose");
const shortid = require("shortid");

const taskSchema = new mongoose.Schema(
    {
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
        members: [
            {
                userId: {
                    type: mongoose.Types.ObjectId,
                    ref: "User"
                }
            }
        ],
        columnId: {
            type: mongoose.Types.ObjectId,
            ref: "Column"
        },
        sortOrder: Number,
        deleted: {
            deletedBy: {
                type: mongoose.Types.ObjectId,
                ref: "User"
            },
            deletedAt: {
                type: Date
            },
            location: {
                type: mongoose.Types.ObjectId,
                ref: "Column"
            }
        },
        shortid: {
            type: String,
            default: shortid.generate()
        }
    },
    { timestamps: true }
);

/**
 * Statics
 */

taskSchema.statics = {
    /**
     *
     * @param {ObjectId} id - the objectId of task
     * @return {Promise<Task, APIError}
     */
    async get(id) {
        try {
            let task;
            if (mongoose.Types.ObjectId.isValid(id)) {
                task = await this.findById(id)
                    .populate("columnId", "name")
                    .exec();
            }
            if (task) {
                return task;
            }

            throw new APIError({
                message: "Task does not exists",
                status: httpStatus.NOT_FOUND
            });
        } catch (error) {
            throw error;
        }
    },

    list({ columnId }) {
        return this.find({ columnId: columnId }).populate("columnId", "name");
    }
};

/**
 * Method
 */
taskSchema.method({
    transform() {
        let transformed = {};
        const fields = [
            "id",
            "name",
            "description",
            "labels",
            "color",
            "members",
            "sortOrder",
            "columnId",
            "shortid"
        ];

        fields.forEach(field => {
            transformed[field] = this[field];
        });
        return transformed;
    }
});

module.exports = new mongoose.model("Task", taskSchema);
