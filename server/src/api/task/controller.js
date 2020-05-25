const Task = require("./model");
const httpStatus = require("http-status");
const APIError = require("../../utils/APIError");

exports.load = async (req, res, next, id) => {
    try {
        const task = await Task.get(id);
        req.locals = { task };
        return next();
    } catch (error) {
        return next(error);
    }
};

/**
 * Get task
 * @public
 */
exports.get = async (req, res, next) => {
    try {
        const task = req.locals.task.transform();
        return res.json({ task });
    } catch (error) {
        return next(error);
    }
};

/**
 * Create new task
 * @public
 */

exports.create = async (req, res, next) => {
    try {
        let task = await new Task(req.body).save();
        // task = await task
        //     .populate("columnId", "name")
        //     .execPopulate();
        res.status(httpStatus.CREATED);
        task = await task.transform();
        return res.json(task);
    } catch (error) {
        return next(error);
    }
};

/**
 * Updat task
 * @public
 */
exports.update = async (req, res, next) => {
    try {
        const task = Object.assign(req.locals.task, req.body);
        let savedTask = await task.save();
        return res.json(savedTask.transform());
    } catch (error) {
        return next(error);
    }
};

/**
 * List task
 * @public
 */
exports.list = async (req, res, next) => {
    try {
        
        const tasks = await Task.list({ columnId: req.params.columnId });
        const transformedTasks = tasks.map( task => task.transform());
        res.json({ tasks:transformedTasks });
    } catch (error) {
        next(error);
    }
};

/**
 * Remove task
 * @public
 */
exports.remove = async (req, res, next) => {
   try {
        const removeInfo = {
            deletedBy: req.user._id,
            deletedAt: new Date(),
            location: req.locals.task.columnId
        };
       const task = Object.assign(req.locals.task, { deleted: removeInfo });
       let savedTask = await task.save();
       return res.json(savedTask.transform());
   } catch (error) {
       return next(error);
   }
};
