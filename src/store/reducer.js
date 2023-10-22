import { ADD_TASK, MARK_TASK_AS_DONE, DELETE_TASK } from './actionTypes';

const initialState = [];

export const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return [action.payload, ...state];
    //Destructuring is ok, but when I will have nested object then it is dangerous, because I will need to use destructuring on every level.
    //I can use 'structuredClone' native js method or external libraries' methods like 'cloneDeep' from lodash
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
