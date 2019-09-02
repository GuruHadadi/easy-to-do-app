import { combineReducers } from 'redux'
import reducer from './tasks';

export default combineReducers({
    root: reducer
})