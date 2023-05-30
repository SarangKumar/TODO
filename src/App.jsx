import './index.css'
import { useState, useEffect } from 'react'

function App() {

	const d = new Date();

	const months = {
		0: 'Jan',
		1: 'Feb',
		2: 'Mar',
		3: 'Apr',
		4: 'May',
		5: 'Jun',
		6: 'Jul',
		7: 'Aug',
		8: 'Sep',
		9: 'Oct',
		10: 'Nov',
		11: 'Dec'
	}

	const days = {
		0: 'Sunday',
		1: 'Monday',
		2: 'Tueday',
		3: 'Wedday',
		4: 'Thuday',
		5: 'Friday',
		6: 'Satday'
	}

	const [task, setTask] = useState([]);
	const [newTask, setNewTask] = useState('');

	useEffect(() => {
		// localStorage.setItem('task', JSON.stringify(task));

		const localtasks = JSON.parse(localStorage.getItem('task'));
		console.log(localtasks);
		setTask(localtasks)


	}, [])


	const day = days[d.getDay()]
	const month = months[d.getMonth()]

	const addTasks = (newtask) => {
		if (newtask != '' && task != null) {
			const newTask = {
				id: task.length + 1,
				done: 0,
				task: newtask
			}
			const updatesTasks = [...task, newTask]
			setTask(updatesTasks)
			localStorage.setItem('task', JSON.stringify(updatesTasks))
		}

		if (task === null && newtask != '') {
			const newTask = [{
				id: 1,
				done: 0,
				task: newtask
			}]
			setTask(newTask)
			localStorage.setItem('task', JSON.stringify(newTask))
		}

		// console.log(newtask);
		// console.log(task);

	}

	const taskDone = (taskId) => {

		// to remove task
		const updatesTask = task.filter(item => item.id !== taskId)
		setTask(updatesTask)

		//change the svg color
		// task.forEach((item) => {
		// 	if (item.id === taskId) {
		// 		item.done = 1;
		// 	}
		// });



		localStorage.setItem('task', JSON.stringify(updatesTask))
		// console.log(taskId)
	}


	const clearAll = () => {
		const emptyArray = [];
		localStorage.setItem('task', JSON.stringify([]))
		setTask(emptyArray);
	}

	return (
		<>
			<main className='w-full md:w-3/4 bg-white text-slate-500 rounded-md px-2 py-6 shadow-md mx-auto flex justify-between flex-col h-[100dvh]'>
				<div>
					<div className='flex justify-between px-6 border-b-[0.5px]'>
						<div className="grid grid-rows-2 grid-flow-col gap-1 font-semibold">
							<div className='row-span-2 text-red-500 text-5xl flex items-center'>
								{d.getDate()}
							</div>
							<div className='mx-1 mt-2'>
								{month}
							</div>
							<div className='mx-1 -my-2'>
								{d.getFullYear()}
							</div>
						</div>
						<div className='flex justify-center items-center uppercase font-semibold'>
							{day}
						</div>
					</div>

					<div className='flex items-center justify-between mx-8'>
						<h1 className='md:text-left mx-2 md:my-5 my-8 text-center text-2xl font-bold text-slate-500'>
							Welcome to TODO List Manager
						</h1>
						<button onClick={clearAll} className=' text-red-400 w-20 hover:shadow-0 hidden md:block h-fit my-auto px-3 py-[2px] rounded-md border-2  border-red-300 hover:bg-red-500 hover:text-red-100 transition-colors'>Clear</button>
						<svg onClick={clearAll} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="shadow-sm shadow-red-300 hover:shadow-0 md:hidden text-slate-500 w-10 h-10 border border-red-300 rounded-md p-1 hover:bg-red-500 hover:border-1 hover:text-red-100 transition-colors">
							<path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
							<path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
						</svg>

					</div>

					<ul className='my-2 mx-5'>
						{(task === null || task.length === 0)
							? <p className='text-center md:text-left text-slate-500 italic text-sm px-4'>No tasks added</p>
							: task.map(list => (
								<Item key={list.id} task={list} taskDone={taskDone} className='text-slate-900'>
									{list.task}
								</Item>
							))}
					</ul>
				</div>


				<div className='flex justify-center items-center sm:gap-x-4 md:gap-x-4 mt-5 px-5 mx-2 md:mx-0 md:px-8'>
					<label htmlFor="" className='flex flex-col w-full'>
						<span className='text-sm font-medium my-px mx-[2px]'>Add new Task</span>
						<input onChange={e => { setNewTask(e.target.value) }} type="text" className="bg-white text-slate-700 ring-1 rounded-md ring-slate-300 px-3 py-2 active:border-none focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500" />
					</label>

					<button className='ml-4 -mb-5 w-10 h-10 bg-red-500 text-white flex justify-center items-center rounded-full shadow-md ' onClick={() => addTasks(newTask)}>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor" className="w-12 h-12">
							<path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					</button>
				</div>
			</main>
		</>
	)
}


const Item = ({ children, task, taskDone }) => {
	return (
		<li className={`flex justify-between items-center px-3 py-1 font-medium text-slate-700`}>
			<div className='space-x-4 flex items-center'>
				<input type="checkbox" className='w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 dark:focus:ring-red-600  focus:ring-2 ' />
				<span className='w-11/12'>
					{children}
				</span>
			</div>
			{/* <svg onClick={() => taskDone(task.id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`w-6 h-6 cursor-pointer ${task.done === 0 ? 'text-red-300' : 'text-slate-400'}`}>
				<path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
			</svg> */}
			<button onClick={() => taskDone(task.id)} className='w-20 border border-red-500 px-2 py-px md:px-3 md:py-1 rounded-md font-bold text-red-500 text-sm hover:bg-red-500 hover:text-white transition-colors'>Delete</button>
		</li>
	)
}

export default App
