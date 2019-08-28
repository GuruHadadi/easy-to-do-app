import * as actionTypes from './actionTypes';

export const createTask = (taskTitle) => {
    return {
        type: actionTypes.CREATE_TASK,
        payload: {taskTitle: taskTitle}
    }
};