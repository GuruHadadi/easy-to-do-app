import * as actionTypes from '../actions/actionTypes';


const initialState = {
    tasks: [],
    tasksCopy: [],
    lastDeletedItem: null,
    // authenticated: !!localStorage.getItem('userId'),
    authenticated: false,
    user: null,
    // userId: localStorage.getItem('userId')
    userId: null
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_TASK:
            const tasks = state.tasks.concat(
                {
                    title: action.payload.taskTitle,
                    completeFlag: false,
                    docName: action.payload.docName
                });
            localStorage.setItem('tasks', JSON.stringify(tasks));
            return {
                ...state,
                tasks: tasks,
                tasksCopy: tasks
            };
        case actionTypes.EDIT_TASK:
            const newArr = state.tasks.map(task => {
                if ( task.docName === action.payload.docName ) {
                    return {
                        ...task,
                        title: action.payload.taskTitle,
                        completeFlag: action.payload.completeFlag,
                    };
                }
                return task
            });
            localStorage.setItem('tasks', JSON.stringify(newArr));
            return {
                ...state,
                tasks: newArr,
                tasksCopy: newArr
            };
        case actionTypes.DELETE_TASK:
            const modifiedArr = [...state.tasks].filter(v => v.docName !== action.payload.docName);
            return {
                ...state,
                tasks: modifiedArr,
                tasksCopy: modifiedArr,
                lastDeletedItem: state.tasks.find(v => v.docName === action.payload.docName)
            };
        case actionTypes.UNDO_TASK_DELETE:
            const modifiedArr1 = [...state.tasks];
            modifiedArr1.splice(state.lastDeletedItem.indexTask,0,state.lastDeletedItem.lastDelItem);
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
            console.log('action.payload.tasks', action.payload.tasks);
            const serverTasks = action.payload.tasks ?
                Object.keys(action.payload.tasks).map(v => ({ ...action.payload.tasks[v], docName: v })) : state.tasks;
            localStorage.setItem('tasks', JSON.stringify(serverTasks));
            return {
                ...state,
                authenticated: true,
                userName: action.payload.displayName,
                userId: action.payload.user.uid,
                tasks: serverTasks,
                tasksCopy: serverTasks,
            };
        case actionTypes.GOOGLE_SIGN_OUT:
            console.log('GOOGLE_SIGN_OUT');
            return {
                ...state,
                authenticated: false,
                user: null
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