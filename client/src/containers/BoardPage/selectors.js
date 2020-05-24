import {createSelector} from 'reselect';

const selectRaw = state => state.board;

const selectName = createSelector(
    [selectRaw],
    board=>board.name
)

const selectBoard = createSelector([selectRaw], board => board.data.board);
const selectColumns = createSelector([selectRaw], board => board.data.columns);

const selector = {
    selectName,
    selectBoard,
    selectColumns
};

export default selector;
