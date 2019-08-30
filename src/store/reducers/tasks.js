import * as actionTypes from '../actions/actionTypes';


const initialState = {
    tasks: [],
    tasksCopy: [],
    lastDeletedItem: null
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_TASK:
            const tasks = state.tasks.concat(
                {
                    title: action.payload.taskTitle,
                    completeFlag: false
                });
            return {
                ...state,
                tasks: tasks,
                tasksCopy: tasks
            };
        case actionTypes.EDIT_TASK:
            const newArr = [...state.tasks];
            newArr[action.payload.indexTask] = {
                ...newArr[action.payload.indexTask],
                title: action.payload.taskTitle
            };
            return {
                ...state,
                tasks: newArr,
                tasksCopy: newArr
            };
        case actionTypes.DELETE_TASK:
            const modifiedArr = [...state.tasks];
            console.log('before modifiedArr', modifiedArr.length);
            console.log('before modifiedArr', JSON.stringify(modifiedArr));
            const lastDelItem = modifiedArr.splice([action.payload.indexTask],1);
            console.log('after modifiedArr', modifiedArr);
            console.log('lastDelItem', lastDelItem);
            return {
                ...state,
                tasks: modifiedArr,
                tasksCopy: modifiedArr,
                lastDeletedItem: {lastDelItem: lastDelItem[0], indexTask: action.payload.indexTask}
            };
        case actionTypes.UNDO_TASK_DELETE:
            const modifiedArr1 = [...state.tasks];
            modifiedArr1.splice(state.lastDeletedItem.indexTask,0,state.lastDeletedItem.lastDelItem);
            console.log('modifiedArr1', modifiedArr1);
            return {
                ...state,
                tasks: modifiedArr1,
                tasksCopy: modifiedArr1,
                lastDeletedItem: null
            };
        case actionTypes.TOGGLE_COMPLETE_TASK:
            const newArrr = [...state.tasks];
            const newArrObj = {...newArrr[action.payload.indexTask]};
            newArrObj.completeFlag = !action.payload.completeFlag;
            newArrr[action.payload.indexTask] = newArrObj;
            return {
                ...state,
                tasks: newArrr,
                tasksCopy: newArrr
            };
        case actionTypes.GOOGLE_SIGN_IN:
            //
            return {
                ...state,
                tasks: newArrr,
                tasksCopy: newArrr
            };
        case actionTypes.DISPLAY_ACTIVE_ITEMS:
            let newArrrr = [];
            switch (action.payload.type){
                case 'complete':
                    newArrrr = [...state.tasksCopy].filter(v => v.completeFlag);
                    break;
                case 'active':
                    newArrrr = [...state.tasksCopy].filter(v => !v.completeFlag);
                    break;
                default:
                    newArrrr = [...state.tasksCopy];
                    break;
            }
            return {
                ...state,
                tasks: newArrrr
            };
        default:
            return state;
    }
};

export default reducer;