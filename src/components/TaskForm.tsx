import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { taskApi } from '../services/api';
import { useTasks } from '../context/TaskContext';
import type {Task} from '../types';

const TaskForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { fetchTasks } = useTasks();

    // Explicitly defining the boolean state fixes the backend null primitive error
    const [task, setTask] = useState<Task>({ title: '', description: '', completed: false });
    const [error, setError] = useState('');

    // Fetch existing task details if we are in "Edit" mode
    useEffect(() => {
        if (id) {
            taskApi.getOne(Number(id)).then(res => setTask(res.data)).catch(() => {
                setError("Failed to load task details.");
            });
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Form Validation (Requirement 3)
        if (!task.title || task.title.length > 100) {
            setError("Title is required and must be under 100 characters");
            return;
        }

        try {
            if (id) {
                // UPDATE: The ID is placed inside the request body payload, not the URL path
                const updatedTaskPayload: Task = { ...task, id: Number(id) };
                await taskApi.update(updatedTaskPayload);
            } else {
                // CREATE: Send the new task
                await taskApi.create(task);
            }

            // Refresh the global task list and redirect to the home page
            await fetchTasks();
            navigate('/');
        } catch (err) {
            setError("Failed to save task. Ensure the backend is running and accepts the payload.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 border p-6 rounded-lg shadow-sm bg-white">
            <h2 className="text-2xl font-bold text-gray-800">{id ? 'Edit Task' : 'New Task'}</h2>

            {error && <div className="bg-red-50 text-red-600 p-3 rounded">{error}</div>}

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Title *</label>
                <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    value={task.title}
                    onChange={e => setTask({...task, title: e.target.value})}
                    placeholder="Enter task title"
                />
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                <textarea
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    rows={3}
                    value={task.description}
                    onChange={e => setTask({...task, description: e.target.value})}
                    placeholder="Optional description"
                />
            </div>

            {/* Only show the 'completed' toggle if we are editing an existing task, or leave it for new tasks too if preferred */}
            <div className="flex items-center gap-2 mt-2">
                <input
                    type="checkbox"
                    id="completed-check"
                    checked={task.completed}
                    onChange={e => setTask({...task, completed: e.target.checked})}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="completed-check" className="text-sm font-medium text-gray-700">Mark as completed</label>
            </div>

            <div className="flex gap-3 pt-4">
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded font-medium transition-colors">
                    Save Task
                </button>
                <button type="button" onClick={() => navigate('/')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded font-medium transition-colors">
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default TaskForm;
