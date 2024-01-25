import React, { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getTask from '@wasp/queries/getTask';
import updateTask from '@wasp/actions/updateTask';
import deleteTask from '@wasp/actions/deleteTask';

export function Task() {
  const { taskId } = useParams();
  const history = useHistory();
  const { data: task, isLoading, error } = useQuery(getTask, { taskId });
  const updateTaskFn = useAction(updateTask);
  const deleteTaskFn = useAction(deleteTask);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setDueDate(task.dueDate);
    }
  }, [task]);

  const handleUpdateTask = () => {
    updateTaskFn({
      taskId,
      title,
      description,
      dueDate
    });
  };

  const handleDeleteTask = () => {
    deleteTaskFn({ taskId });
    history.push('/');
  };

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      <input
        type='text'
        placeholder='Title'
        className='px-1 py-2 border rounded text-lg'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder='Description'
        className='px-1 py-2 border rounded text-lg'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <input
        type='date'
        className='px-1 py-2 border rounded text-lg'
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button
        onClick={handleUpdateTask}
        className='bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded'
      >
        Update Task
      </button>
      <button
        onClick={handleDeleteTask}
        className='bg-red-500 hover:bg-red-700 px-2 py-2 text-white font-bold rounded'
      >
        Delete Task
      </button>
      <Link to='/' className='bg-gray-500 hover:bg-gray-700 px-2 py-2 text-white font-bold rounded ml-2'>Back</Link>
    </div>
  );
}
