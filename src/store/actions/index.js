import * as actionTypes from './actionTypes';
import firebase from 'firebase';
import axios from 'axios';

export const saveTask = (taskTitle, docName) => {
    return {
        type: actionTypes.CREATE_TASK,
        payload: {taskTitle: taskTitle, docName}
    }
};


export const editTaskAction = (taskTitle, completeFlag, docName) => {
    return {
        type: actionTypes.EDIT_TASK,
        payload: {taskTitle: taskTitle, completeFlag, docName}
    }
};

export const editTask = (task, taskTitle, userId) => {
    return dispatch => {
        axios.patch(`https://easy-todo-app-2fc3d.firebaseio.com/${userId}/${task.docName}.json`, {title: taskTitle, completeFlag: task.completeFlag}).then(res => {
            dispatch(editTaskAction(taskTitle, task.completeFlag, task.docName))
        })
        .catch(function (error) {
        });
    }
};

export const deleteTaskAction = (docName) => {
    return {
        type: actionTypes.DELETE_TASK,
        payload: { docName }
    }
};

export const deleteTask = (task, userId) => {
    return dispatch => {
        axios.delete(`https://easy-todo-app-2fc3d.firebaseio.com/${userId}/${task.docName}.json`).then(res => {
            dispatch(deleteTaskAction(task.docName))
        })
            .catch(function (error) {
            });
    }
};

export const deleteTaskStart = (task, userId) => {
    return {
        type: actionTypes.START_DELETE_TASK,
        payload: { docName: task.docName }
    }
};

export const undoTaskDelete = () => {
    return {
        type: actionTypes.UNDO_TASK_DELETE,
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

const handleSignInWithGoogle = (userData, tasksData) => {
    return {
        type: actionTypes.GOOGLE_SIGN_IN,
        payload: {user: userData, tasks: tasksData},
    }
};

export const getTasksFromLocalStorage = () => {
    return {
        type: actionTypes.GET_TASKS_FROM_LOCAL_STORAGE,
    }
};

const handleSignOut = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('tasks');
    localStorage.removeItem('uid');
    return {
        type: actionTypes.GOOGLE_SIGN_OUT,
    }
};

export const signInWithGoogle = () => {
    return dispatch => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const token = result.credential.accessToken;
            // The signed-in user info.
            const userData = result.user;
            localStorage.setItem('userId', userData.uid);
            axios.get(`https://easy-todo-app-2fc3d.firebaseio.com/${userData.uid}.json`).then(tasksData => {
                dispatch(handleSignInWithGoogle(userData, tasksData.data));
            })
            .catch(function (error) {
            });
            // dispatch(handleSignInWithGoogle(user));
            // dispatch(getTasksFromFirebase(user));
        }).catch(function (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            const credential = error.credential;
            // ...
        });
    }
};

export const getTasksFromFirebase = (userData) => {
    return dispatch => {
        axios.get(`https://easy-todo-app-2fc3d.firebaseio.com/${userData.user.uid}.json`).then(res => {
            dispatch(handleSignInWithGoogle(userData));
        })
        .catch(function (error) {
        });
    }
};

export const createTask = (taskTitle, userId, completeFlag=false) => {
    return dispatch => {
        //  TODO: if authenticated then save in server else not required
        axios.post(`https://easy-todo-app-2fc3d.firebaseio.com/${userId}.json`, {title: taskTitle, completeFlag}).then(res => {
            dispatch(saveTask(taskTitle, res.data.name))
        })
        .catch(function (error) {
        });
    }
};
export const signOutGoogle = () => {
    return dispatch => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signOut().then(function() {
            dispatch(handleSignOut())
        }).catch(function(error) {
            // An error happened.
        });
    }
};

//  [0,1,2,3]