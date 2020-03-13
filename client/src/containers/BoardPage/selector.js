import {createSelector} from 'reselect';

const selectRaw = state => state.board;

const selectName = createSelector(
    [selectRaw],
    board=>board.name
)

const selector = {
    selectName
}

export default selector;
