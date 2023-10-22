import {
	combineReducers,
	legacy_createStore as createStore,
	compose,
} from 'redux';
import { tasksReducer } from './reducer';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({ task: tasksReducer });

export const store = createStore(rootReducer, composeEnhancer());
