import { deleteTask, markTaskAsDone } from '../store/actionCreators';
import { useDispatch } from 'react-redux';
import styles from './task.module.scss';

export const Task = ({ task, index }) => {
  const dispatch = useDispatch();

  const onClickHandler = () => {
    dispatch(deleteTask(task.id));
  };
  const onChangeHandler = () => {
    dispatch(markTaskAsDone(index));
  };

  return (
    <div className={task.completed ? styles.completed : styles.uncompleted}>
      <input
        className={styles.input}
        type='checkbox'
        checked={task.completed}
        onChange={onChangeHandler}
      />
      <p className={task.completed ? styles.pcompleted : styles.puncompleted}>
        {task.text}
      </p>
      <button className={styles.button} onClick={onClickHandler}>
        x
      </button>
    </div>
  );
};
