import { useSelector } from 'react-redux';
import { CustomInput } from '../components/CustomInput';
import { Task } from '../components/Task';
import styles from './todo.module.scss';

export const Todo = () => {
  const listOfTasks = useSelector((state) => state.task);

  return (
    <div className={styles.container}>
      <h1>Todo App</h1>
      <CustomInput />
      <div>
        {listOfTasks?.map((task, index) => (
          <Task key={task.id} task={task} index={index} />
        ))}
      </div>
    </div>
  );
};
