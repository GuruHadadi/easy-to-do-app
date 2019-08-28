import * as actionTypes from '../actions/actionTypes';


const initialState = {
    tasks: []
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_TASK:
            console.log('action.payload', action.payload);
            return {
                ...state,
                tasks: state.tasks.concat(action.payload.taskTitle)
            };
        default:
            return state;
    }
};

export default reducer;