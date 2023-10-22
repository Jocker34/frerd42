export const debounce = (func, timeout = 500) => {
	let timer;
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			func.apply(this, args);
		}, timeout);
	};
};

export const validateTask = (listOfTasks, task) => {
	const validationRules = [
		{
			condition: task.length === 0,
			message: 'Task cannot be empty',
		},
		{
			condition: listOfTasks.find((el) => el.text === task),
			message: 'Task already exists.',
		},
		{
			condition: task.length > 50,
			message: 'Task is too long. Please keep it under 50 characters.',
		},
	];

	const error = validationRules.find((rule) => rule.condition);
	return error ? error.message : null;
};
