import {createSelector} from 'reselect';

const selectRaw = state => state.board;

const selectName = createSelector(
    [selectRaw],
    board=>board.name
)

const selectBoard = createSelector([selectRaw], (board) => board.board);
const selectBoards = createSelector([selectRaw], (board) => board.boards);



const selector = {
    selectName,
    selectBoard,
    selectBoards,
};

export default selector;
