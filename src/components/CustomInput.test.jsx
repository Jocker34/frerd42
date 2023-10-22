import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { CustomInput } from './CustomInput';
import { addTask } from '../store/actionCreators';

jest.mock('../helper', () => {
	return {
		debounce: (func) => func,
		validateTask: jest.fn(),
	};
});

const mockStore = configureStore([]);
const initialState = {};

describe('CustomInput component', () => {
	it('renders properly', () => {
		const store = mockStore(initialState);
		const { getByPlaceholderText, getByText } = render(
			<Provider store={store}>
				<CustomInput />
			</Provider>
		);

		const inputElement = getByPlaceholderText('Add new task');
		expect(inputElement).toBeInTheDocument();

		const addButton = getByText('Add');
		expect(addButton).toBeInTheDocument();
	});

	it('handles text input properly', () => {
		const store = mockStore(initialState);
		const { getByPlaceholderText } = render(
			<Provider store={store}>
				<CustomInput />
			</Provider>
		);

		const inputElement = getByPlaceholderText('Add new task');
		fireEvent.change(inputElement, { target: { value: 'Nowe zadanie' } });

		expect(inputElement.value).toBe('Nowe zadanie');
	});

	it('dispatches addTask action when "Add" button is clicked', async () => {
		const store = mockStore(initialState);
		const { getByPlaceholderText, getByText } = render(
			<Provider store={store}>
				<CustomInput />
			</Provider>
		);

		const { validateTask } = require('../helper');
		validateTask.mockReturnValue(null);

		const inputElement = getByPlaceholderText('Add new task');
		fireEvent.change(inputElement, { target: { value: 'Nowe zadanie' } });

		const addButton = getByText('Add');
		fireEvent.click(addButton);

		await waitFor(() => {
			const expectedAction = addTask({
				id: expect.any(String),
				text: 'Nowe zadanie',
				completed: false,
			});
			expect(store.getActions()).toContainEqual(expectedAction);
		});
	});
});
