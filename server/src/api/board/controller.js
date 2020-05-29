const Board = require("./model");
const Column = require('../column/model')
const Task = require("../task/model");
const httpStatus = require("http-status");
const APIError = require("../../utils/APIError");
const shortid = require('shortid')
const _ = require('lodash')

const checkOwner = (currentuserId, ownerId) => {
    if (currentuserId.toString() == ownerId.toString()) {
        return true;
    }
    return false;
};


exports.load = async (req, res, next, id) => {
    try {
        const board = await Board.get(id);
        req.locals = { board };
        return next();
    } catch (error) {
        return next(error);
    }
};

const getTaskByColumnId = async (columnId) => {
    return Task.find({
        columnId,
    }).sort("sortOrder");
}

/**
 * Get board
 * @public
 */
exports.get = async (req, res, next) => {
    try {
        const board = req.locals.board.transform();

        if (checkOwner(board.owner._id,req.user._id)) {
            let columns = await Column.find({ boardId: board.shortid }).sort({
                sortOrder:1,
            });
            let resColumns = await Promise.all(
                columns.map(async (column) => {
                    const columnTemp = column.transform();
                    columnTemp.tasks = await getTaskByColumnId(column.shortid);
                    return columnTemp;
                })
            );
            resColumns = _.orderBy(resColumns, ["sortOrder"], ["asc"]);
            return res.json({ board, columns: resColumns });
        }
        throw new APIError({
            message: "Something went wrong",
            status: httpStatus.BAD_REQUEST
        });
    } catch (error) {
        return next(error);
    }
};

/**
 * Create new board
 * @public
 */

exports.create = async (req, res, next) => {
    try {
        const owner = req.user._id;
        const { columns } = req.body;
        let board = await new Board({
            ...req.body,
            owner: owner,
            shortid: shortid.generate(),
        }).save();

        columns.forEach(async column => {
            await new Column({
                ...column,
                boardId: board.shortid,
                shortid: shortid.generate(),
            }).save();
        })
        board = await board
            .populate("owner", "email fullName avatar")
            .execPopulate();
        res.status(httpStatus.CREATED);
        board = await board.transform();
        return res.json(board);
    } catch (error) {
        return next(error);
    }
};

/**
 * Updat board
 * @public
 */
exports.update = async (req, res, next) => {
    try {
        // check current user is owner?
        if (checkOwner(req.locals.board.owner._id, req.user._id)) {
            const board = Object.assign(req.locals.board, req.body);
            let savedBoard = await board.save();
            return res.json(savedBoard.transform());
        }
        throw new APIError({
            message: "Something went wrong",
            status: httpStatus.BAD_REQUEST
        });
    } catch (error) {
        return next(error);
    }
};

/**
 * List board
 * @public
 */
exports.list = async (req, res, next) => {
    try {
        const boards = await Board.list({ currentUserId: req.user._id });
        const transformedBoards = boards.map( board => board.transform());
        res.json({ boards:transformedBoards });
    } catch (error) {
        next(error);
    }
};

/**
 * Remove board
 * @public
 */
exports.remove = async (req, res, next) => {
    // Người dùng hiện tại có phải là chủ sở hữu của bảng này không
    try {
        const board = req.locals.board;
        if (checkOwner(req.user._id, board.owner._id)){
            let boardRemoved = await board.remove()
            return res.json(boardRemoved.transform());
        }
        throw new APIError({
            message: "Something went wrong",
            status: httpStatus.BAD_REQUEST
        });
                
    } catch (error) {

        return next(error);
    }
};
