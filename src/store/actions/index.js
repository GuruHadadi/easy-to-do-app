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

export const signIn = () => {
    //  install firebase, thunk,
    // const provider = new firebase.auth.GoogleAuthProvider();
    // firebase.auth().signInWithPopup(provider).then(function(result) {
    //     // This gives you a Google Access Token. You can use it to access the Google API.
    //     var token = result.credential.accessToken;
    //     // The signed-in user info.
    //     var user = result.user;
    //     // ...
    // }).catch(function(error) {
    //     // Handle Errors here.
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     // The email of the user's account used.
    //     var email = error.email;
    //     // The firebase.auth.AuthCredential type that was used.
    //     var credential = error.credential;
    //     // ...
    // });
    // return {
    //     type: actionTypes.GOOGLE_SIGN_IN,
    //     payload: {result: }
    // }
};

//  [0,1,2,3]