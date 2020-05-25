import { createSelector } from "reselect";

const selectRaw = (state) => state.column;


const selectColumns= createSelector([selectRaw], (board) => board.columns);

const selector = {
    selectColumns,
};

export default selector;
