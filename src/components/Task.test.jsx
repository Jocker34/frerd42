import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Task } from './Task';
import { deleteTask, markTaskAsDone } from '../store/actionCreators';

const mockStore = configureStore([]);
const initialState = {};

test('Task component renders with completed status', () => {
	const task = { id: 1, text: 'Sample task', completed: true };
	const store = mockStore(initialState);

	const { container, getByText } = render(
		<Provider store={store}>
			<Task task={task} index={0} />
		</Provider>
	);

	expect(getByText('Sample task')).toBeInTheDocument();

	expect(container.querySelector('button').textContent).toBe('x');
});

test('Task component renders with uncompleted status', () => {
	const task = { id: 2, text: 'Another task', completed: false };
	const store = mockStore(initialState);

	const { container, getByText } = render(
		<Provider store={store}>
			<Task task={task} index={1} />
		</Provider>
	);

	expect(getByText('Another task')).toBeInTheDocument();

	expect(container.querySelector('button').textContent).toBe('x');
});

test('Task component dispatches deleteTask action when the "x" button is clicked', () => {
	const task = { id: 3, text: 'Yet another task', completed: false };
	const store = mockStore(initialState);

	const { container } = render(
		<Provider store={store}>
			<Task task={task} index={2} />
		</Provider>
	);

	const deleteButton = container.querySelector('button');
	fireEvent.click(deleteButton);

	const actions = store.getActions();

	expect(actions).toEqual([deleteTask(task.id)]);
});

test('Task component dispatches markTaskAsDone action when the checkbox is changed', () => {
	const task = { id: 4, text: 'One more task', completed: false };
	const store = mockStore(initialState);

	const { container } = render(
		<Provider store={store}>
			<Task task={task} index={3} />
		</Provider>
	);

	const checkbox = container.querySelector('input[type="checkbox"]');
	fireEvent.click(checkbox);

	const actions = store.getActions();

	expect(actions).toEqual([markTaskAsDone(3)]);
});
