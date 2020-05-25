import {createSelector} from 'reselect';

const selectRaw = state => state.board;

const selectName = createSelector(
    [selectRaw],
    board=>board.name
)

const selectBoard = createSelector([selectRaw], board => board.board);

const selector = {
    selectName,
    selectBoard
};

export default selector;
