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
  //I used unique id for the task because it's a really important to not use index as a key in react.
  //In this case, it doesn't change anything if I use index, but it can bring the problems when I will for example implement drag&drop functionality.
  //Explanation: https://adhithiravi.medium.com/why-do-i-need-keys-in-react-lists-dbb522188bbb

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
      {/* && operator is little bit risky in conditional rendering https://kentcdodds.com/blog/use-ternaries-rather-than-and-and-in-jsx so I used double negation '!!' */}
    </>
  );
};
