import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Todo } from './Todo';

const mockStore = configureStore([]);
const initialState = {
  task: [
    { id: '1', text: 'Task 1', completed: false },
    { id: '2', text: 'Task 2', completed: true },
  ],
};

test('Todo component renders correctly', () => {
  const store = mockStore(initialState);

  const { getByText, getByPlaceholderText } = render(
    <Provider store={store}>
      <Todo />
    </Provider>
  );

  expect(getByText('Todo App')).toBeInTheDocument();

  const inputElement = getByPlaceholderText('Add new task');
  expect(inputElement).toBeInTheDocument();

  expect(getByText('Add')).toBeInTheDocument();

  expect(getByText('Task 1')).toBeInTheDocument();
  expect(getByText('Task 2')).toBeInTheDocument();
});
