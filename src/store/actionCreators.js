import { ADD_TASK, DELETE_TASK, MARK_TASK_AS_DONE } from './actionTypes';

export const addTask = (newTask) => {
	return { type: ADD_TASK, payload: newTask };
};

export const deleteTask = (payload) => {
	return { type: DELETE_TASK, payload };
};

export const markTaskAsDone = (updateTask) => {
	return { type: MARK_TASK_AS_DONE, payload: updateTask };
};
