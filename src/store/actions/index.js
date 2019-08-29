import * as actionTypes from './actionTypes';

export const createTask = (taskTitle) => {
    return {
        type: actionTypes.CREATE_TASK,
        payload: {taskTitle: taskTitle}
    }
};

export const editTask = (indexTask, taskTitle) => {
    return {
        type: actionTypes.EDIT_TASK,
        payload: {taskTitle: taskTitle, indexTask: indexTask}
    }
};

export const deleteTask = (indexTask) => {
    return {
        type: actionTypes.DELETE_TASK,
        payload: {indexTask: indexTask}
    }
};

export const toggleComplete = (indexTask, completedFlag) => {
    return {
        type: actionTypes.TOGGLE_COMPLETE_TASK,
        payload: {indexTask: indexTask, completeFlag: completedFlag}
    }
};

export const activeItemsList = (type) => {
    return {
        type: actionTypes.DISPLAY_ACTIVE_ITEMS,
        payload: {type: type}
    }
};

//  [0,1,2,3]