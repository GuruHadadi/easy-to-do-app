import * as actionTypes from '../actions/actionTypes';


const initialState = {
    tasks: [],
    tasksCopy: [],
    lastDeletedItem: null,
    // authenticated: !!localStorage.getItem('userId'),
    authenticated: false,
    user: null,
    // userId: localStorage.getItem('userId')
    userId: null,
    lastDeletedItemIndex: null
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
            console.log('tasks', tasks);
            localStorage.removeItem('tasks');
            localStorage.setItem('tasks', JSON.stringify(tasks));
            // let tsks = JSON.parse(localStorage.getItem('tasks'));
            // localStorage.setItem('tasks', JSON.stringify(JSON.parse([...tsks, tasks])));
            return {
                ...state,
                tasks: tasks,
                tasksCopy: tasks
            };
        case actionTypes.EDIT_TASK:
            localStorage.removeItem('tasks');
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
            localStorage.removeItem('tasks');
            let lastDelItem = null;
            const modifiedArr = [...state.tasks].filter((v, i) => {
                lastDelItem = i;
                return v.docName !== action.payload.docName
            });
            localStorage.setItem('tasks', JSON.stringify(modifiedArr));
            return {
                ...state,
                tasks: modifiedArr,
                tasksCopy: modifiedArr,
                lastDeletedItem: state.tasks.find(v => v.docName === action.payload.docName),
                lastDeletedItemIndex: lastDelItem
            };
        case actionTypes.UNDO_TASK_DELETE:
            const modifiedArr1 = [...state.tasks];
            // modifiedArr1.splice(state.lastDeletedItemIndex, state.lastDeletedItem.indexTask,0,state.lastDeletedItem);
            console.log('state.lastDeletedItem', state.lastDeletedItem);
            modifiedArr1.splice(state.lastDeletedItem.indexTask, 0, state.lastDeletedItem);
            return {
                ...state,
                tasks: modifiedArr1,
                tasksCopy: modifiedArr1,
                lastDeletedItem: null,
                lastDeletedItemIndex: null
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
            console.log('action.payload', action.payload);
            const serverTasks = action.payload.tasks ?
                Object.keys(action.payload.tasks).map(v => ({ ...action.payload.tasks[v], docName: v })) : state.tasks;
            localStorage.setItem('tasks', JSON.stringify(serverTasks));
            localStorage.setItem('userName', action.payload.user.displayName);
            return {
                ...state,
                authenticated: true,
                userName: action.payload.user.displayName,
                userId: action.payload.user.uid,
                tasks: serverTasks,
                tasksCopy: serverTasks,
            };
        case actionTypes.GET_TASKS_FROM_LOCAL_STORAGE:
            const localTasks = JSON.parse(localStorage.getItem('tasks'));
            console.log('localTasks', localTasks);
            const serverTasks1 = localTasks ?
            Object.keys(localTasks).map(v => ({ ...localTasks[v], docName: v })) : state.tasks;
            return {
                ...state,
                authenticated: (localStorage.getItem('userId') ? true : false),
                userName: localStorage.getItem('userName'),
                userId: localStorage.getItem('userId'),
                tasks: serverTasks1,
                tasksCopy: serverTasks1,
            };
        case actionTypes.GOOGLE_SIGN_OUT:
            return {
                ...state,
                authenticated: false,
                user: null,
                tasks: [],
                tasksCopy: [],
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