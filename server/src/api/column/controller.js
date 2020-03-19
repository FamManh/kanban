const Column = require("./model");
const httpStatus = require("http-status");
const APIError = require("../../utils/APIError");


exports.load = async (req, res, next, id) => {
    try {
        const column = await Column.get(id);
        req.locals = { column };
        return next();
    } catch (error) {
        return next(error);
    }
};

/**
 * Get column
 * @public
 */
exports.get = async (req, res, next) => {
    try {
        const column = req.locals.column.transform();
        return res.json({ column });
    } catch (error) {
        return next(error);
    }
};

/**
 * Create new column
 * @public
 */

exports.create = async (req, res, next) => {
    try {
        let column = await new Column(req.body).save();
        column = await column
            .populate("branchId", "name")
            .execPopulate();
        res.status(httpStatus.CREATED);
        column = await column.transform();
        return res.json(column);
    } catch (error) {
        return next(error);
    }
};

/**
 * Updat column
 * @public
 */
exports.update = async (req, res, next) => {
    try {
        const column = Object.assign(req.locals.column, req.body);
        let savedColumn = await column.save();
        return res.json(savedColumn.transform());
    } catch (error) {
        return next(error);
    }
};

/**
 * List column
 * @public
 */
exports.list = async (req, res, next) => {
    try {
        
        const columns = await Column.list({ boardId: req.params.boardId });
        const transformedColumns = columns.map( column => column.transform());
        res.json({ columns:transformedColumns });
    } catch (error) {
        next(error);
    }
};

/**
 * Remove column
 * @public
 */
exports.remove = async (req, res, next) => {
    try {
        const column = req.locals.column;
        let columnRemoved = await column.remove();
        // Delete all task of this column
        return res.json(columnRemoved.transform());


    } catch (error) {

        return next(error);
    }
};
