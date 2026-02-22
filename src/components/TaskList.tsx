import { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { taskApi } from '../services/api';
import { Link } from 'react-router-dom';
import type {Task} from '../types';

const TaskList = () => {
    const { tasks, fetchTasks, loading } = useTasks();
    const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

    const filteredTasks = tasks.filter(t => {
        if (filter === 'pending') return !t.completed;
        if (filter === 'completed') return t.completed;
        return true;
    });

    const toggleComplete = async (task: Task) => {
        if (!task.id) return;
        await taskApi.update({ ...task, completed: !task.completed });
        fetchTasks();
    };

    if (loading) return <p className="text-center text-gray-500 mt-10">Loading...</p>;

    return (
        <div className="space-y-6">
            <div className="flex gap-4 border-b pb-4">
                {['all', 'pending', 'completed'].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f as any)}
                        className={`text-sm tracking-wide uppercase transition-colors ${filter === f ? 'text-black font-semibold' : 'text-gray-400 hover:text-gray-700'}`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            <div className="space-y-2">
                {filteredTasks.map((task) => (
                    <div key={task.id} className="group flex items-center justify-between p-4 border rounded-md hover:border-gray-400 transition-colors bg-white">
                        <div className="flex items-center gap-4">
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => toggleComplete(task)}
                                className="w-4 h-4 text-black border-gray-300 focus:ring-black rounded-sm cursor-pointer"
                            />
                            <div>
                <span className={`block transition-all ${task.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                  {task.title}
                </span>
                                {task.description && (
                                    <span className={`text-sm mt-1 block ${task.completed ? 'text-gray-300' : 'text-gray-500'}`}>
                    {task.description}
                  </span>
                                )}
                            </div>
                        </div>
                        <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Link to={`/edit/${task.id}`} className="text-sm text-gray-500 hover:text-black transition-colors">Edit</Link>
                            <button
                                onClick={async () => { await taskApi.delete(task.id!); fetchTasks(); }}
                                className="text-sm text-gray-500 hover:text-red-600 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}

                {filteredTasks.length === 0 && (
                    <p className="text-gray-400 text-center py-8">No tasks match this filter.</p>
                )}
            </div>
        </div>
    );
};

export default TaskList;