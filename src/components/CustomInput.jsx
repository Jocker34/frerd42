import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../store/actionCreators';
import { debounce, validateTask } from '../helper';
import styles from './customInput.module.scss';

export const CustomInput = () => {
	const ref = useRef(null);
	const [newTask, setNewTask] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const listOfTasks = useSelector((state) => state.task);
	const dispatch = useDispatch();

	const newId = new Date().getTime().toString();

	const handleOnChange = (e) => {
		setNewTask(e?.target?.value);
	};

	const debounceOnChange = debounce(handleOnChange, 200);

	const handleOnClick = () => {
		if (validateTask(listOfTasks, newTask)) {
			setErrorMessage(validateTask(listOfTasks, newTask));
			return;
		}
		dispatch(addTask({ id: newId, text: newTask, completed: false }));
		ref.current.value = '';
		setErrorMessage('');
	};
	return (
		<>
			<div className={styles.container}>
				<input
					className={styles.input}
					ref={ref}
					type='text'
					defaultValue={newTask}
					placeholder='Add new task'
					onChange={debounceOnChange}
				/>
				<button className={styles.button} onClick={handleOnClick}>
					Add
				</button>
			</div>
			{!!errorMessage && <p>{errorMessage}</p>}
		</>
	);
};
