import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getTasks from '@wasp/queries/getTasks';
import createTask from '@wasp/actions/createTask';

export function TaskList() {
  const { data: tasks, isLoading, error } = useQuery(getTasks);
  const createTaskFn = useAction(createTask);
  const [newTask, setNewTask] = useState({ title: '', description: '', dueDate: '' });

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateTask = () => {
    createTaskFn(newTask);
    setNewTask({ title: '', description: '', dueDate: '' });
  };

  return (
    <div className='p-4'>
      <div className='mb-4'>
        <input
          type='text'
          placeholder='Task Title'
          className='px-2 py-1 border rounded'
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
      </div>
      <div className='mb-4'>
        <textarea
          placeholder='Task Description'
          className='px-2 py-1 border rounded'
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        ></textarea>
      </div>
      <div className='mb-4'>
        <input
          type='date'
          className='px-2 py-1 border rounded'
          value={newTask.dueDate}
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
        />
      </div>
      <button
        onClick={handleCreateTask}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Add Task
      </button>
      <div className='mt-4'>
        {tasks.map((task) => (
          <div
            key={task.id}
            className='bg-gray-100 p-4 mb-4 rounded-lg'
          >
            <h3 className='text-lg font-bold'>{task.title}</h3>
            <p className='mt-2'>{task.description}</p>
            <p className='mt-2'>Due Date: {task.dueDate}</p>
            <Link to={`/task/${task.id}`} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2'>Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
