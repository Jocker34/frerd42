import { ADD_TASK, MARK_TASK_AS_DONE, DELETE_TASK } from './actionTypes';

const initialState = [];

export const tasksReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_TASK:
			return [...state, action.payload];
		case DELETE_TASK:
			const newState = [...state];
			return newState.filter((e) => e.id !== action.payload);
		case MARK_TASK_AS_DONE:
			const newTasks = [...state];
			newTasks[action.payload].completed = !newTasks[action.payload].completed;
			newTasks.push(newTasks.splice(action.payload, 1)[0]);
			return [...newTasks];
		default:
			console.log('Nastąpiła akcja której reducer nie zna');
			return state;
	}
};
