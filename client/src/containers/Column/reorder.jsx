import taskActions from "../Task/actions";

// a little function to help us with reordering the result

// // new prev / next task id
// const getNextPrevTask = (list, index) => {
//     let next = null, prev = null;
//     if(index === 0 && list.length === 0){
//         // chuyển sang cột chưa có task nào
//     }else if(index === 0 && list.length > 0){
//         // di chuyển lên trên cùng
//         next = list[0].shortid
//     }else if (index >= list.length-1){
//         // di chuyển xuống cuối cùng
//         prev = list[list.length - 1].shortid;
//     } else{
//         next = list[index+1].shortid;
//         prev = list[index].shortid;
//     }
//     console.log("prev: ", prev);
//     console.log("next: ", next);
//     return [prev, next];
// }

const getSortOrder = (list, index) => {
    let sortOrder = 0;
    if (list.length === 0) {
        sortOrder = 0;
    } else if (index === 0) {
        sortOrder = list[index].sortOrder - 500;
    } else if (index >= list.length - 1) {
        sortOrder = list[list.length - 1].sortOrder + 500;
    } else {
        sortOrder =
            list[index].sortOrder +
            (list[index + 1].sortOrder - list[index].sortOrder) / 2;
    }
    return sortOrder;
};

const reorder = (list, startIndex, endIndex, newColumnId) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    let tempTask = {
        ...removed,
    };
    tempTask.sortOrder = getSortOrder(list, endIndex);
    result.splice(endIndex, 0, tempTask);
    // call api merge task
    taskActions.doReorder({
        columnId: newColumnId,
        taskId: tempTask.shortid,
        sortOrder: tempTask.sortOrder,
    });
    return result;
};

export default reorder;

export const reorderQuoteMap = ({ quoteMap, source, destination }) => {
    const current = quoteMap.filter(
        (item) => item.shortid === source.droppableId
    )[0]; // curent column
    const next = quoteMap.filter(
        (item) => item.shortid === destination.droppableId
    )[0]; // next column
    const target = current.tasks[source.index]; // task

    // cùng 1 cột
    if (source.droppableId === destination.droppableId) {
        const reordered = reorder(
            current.tasks,
            source.index,
            destination.index,
            destination.droppableId
        );
        // call api merge task
        // const [newPrevTaskId, newNextTaskId] = getNextPrevTask(
        //     next.tasks,
        //     destination.index
        // );

        let result = [];
        quoteMap.forEach((column, index) => {
            let tempColumn = {
                ...column,
            };
            if (column.shortid === destination.droppableId) {
                tempColumn.tasks = reordered;
                result.push(tempColumn);
            } else {
                result.push(tempColumn);
            }
        });
        return {
            quoteMap: result,
        };
    }

    // khác columns
    let currentTasks = [...current.tasks];
    let nextTasks = [...next.tasks];
    // get sortOrder
    let sortOrder = getSortOrder(nextTasks, destination.index);

    // call api merge task
    taskActions.doReorder({
        columnId: next.shortid,
        taskId: target.shortid,
        sortOrder: sortOrder,
    });

    currentTasks.splice(source.index, 1);
    nextTasks.splice(destination.index, 0, {
        ...target,
        sortOrder,
    });

    let result = [];
    quoteMap.forEach((column, index) => {
        let tempColumn = {
            ...column,
        };
        if (column.shortid === current.shortid) {
            tempColumn.tasks = currentTasks;
            result.push(tempColumn);
        } else if (column.shortid === next.shortid) {
            tempColumn.tasks = nextTasks;
            result.push(tempColumn);
        } else {
            result.push(tempColumn);
        }
    });

    return {
        quoteMap: result,
    };
};
