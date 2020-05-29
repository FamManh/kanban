import { createSelector } from "reselect";

const selectRaw = (state) => state.task;


const selectTaskId = createSelector([selectRaw], (task) => task.taskId);
const selectTask = createSelector([selectRaw], (task) => task.task);

const selector = {
    selectTaskId,
    selectTask,
};

export default selector;
