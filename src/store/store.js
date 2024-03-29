import { createStore } from 'redux';
import reducer from './reducers/index';
import thunk from 'redux-thunk';
import { compose, applyMiddleware } from 'redux';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));



// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const rootReducers = combineReducers({
//     burgerBuilder: burgerBuilderReducer,
//     order: ordersReducer,
//     auth: authReducer
// });
// const store = createStore(rootReducers,
//     composeEnhancers(applyMiddleware(thunk)));


export default store;
