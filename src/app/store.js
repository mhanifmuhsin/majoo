import { combineReducers, legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import todoListReducer from '../features/TodoList/reducer'

const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducers = combineReducers({
    todoList: todoListReducer,
   
});

const store = createStore(rootReducers, composerEnhancer(applyMiddleware(thunk)));

export default store