import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { taskApi } from '../services/api';
import { useTasks } from '../context/TaskContext';
import type {Task} from '../types';

const TaskForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { fetchTasks } = useTasks();

    const [task, setTask] = useState<Task>({ title: '', description: '', completed: false });
    const [error, setError] = useState('');

    useEffect(() => {
        if (id) {
            taskApi.getOne(Number(id)).then(res => setTask(res.data)).catch(() => {
                setError("Failed to load task.");
            });
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!task.title || task.title.length > 100) {
            setError("Title is required and must be under 100 characters.");
            return;
        }

        try {
            if (id) {
                await taskApi.update({ ...task, id: Number(id) });
            } else {
                await taskApi.create(task);
            }
            await fetchTasks();
            navigate('/');
        } catch (err) {
            setError("Failed to save task. Check server connection.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg space-y-6">
            <h2 className="text-2xl font-light tracking-tight text-gray-900">{id ? 'Edit Task' : 'New Task'}</h2>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <div className="space-y-4">
                <div>
                    <label className="block text-xs uppercase tracking-wide text-gray-500 mb-2">Title</label>
                    <input
                        type="text"
                        className="w-full p-3 border rounded-md outline-none focus:border-black transition-colors"
                        value={task.title}
                        onChange={e => setTask({...task, title: e.target.value})}
                        placeholder="What needs to be done?"
                    />
                </div>

                <div>
                    <label className="block text-xs uppercase tracking-wide text-gray-500 mb-2">Description</label>
                    <textarea
                        className="w-full p-3 border rounded-md outline-none focus:border-black transition-colors resize-none"
                        rows={4}
                        value={task.description}
                        onChange={e => setTask({...task, description: e.target.value})}
                        placeholder="Add details..."
                    />
                </div>

                <div className="flex items-center gap-3 pt-2">
                    <input
                        type="checkbox"
                        id="completed-check"
                        checked={task.completed}
                        onChange={e => setTask({...task, completed: e.target.checked})}
                        className="w-4 h-4 text-black border-gray-300 focus:ring-black rounded-sm cursor-pointer"
                    />
                    <label htmlFor="completed-check" className="text-sm text-gray-700 cursor-pointer">Mark as completed</label>
                </div>
            </div>

            <div className="flex gap-4 pt-4 border-t">
                <button type="submit" className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors">
                    Save
                </button>
                <button type="button" onClick={() => navigate('/')} className="text-gray-500 hover:text-black px-4 py-2 transition-colors">
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default TaskForm;