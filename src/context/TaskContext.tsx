import React, { createContext, useContext, useState, useEffect } from 'react';
import { taskApi } from '../services/api';
import type {Task} from '../types';

interface TaskContextType {
    tasks: Task[];
    loading: boolean;
    fetchTasks: () => Promise<void>;
}

// 1. Create the Context (Not exported to keep ESLint happy)
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// 2. Export the Provider Component
export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTasks = async () => {
        try {
            const { data } = await taskApi.getAll();
            setTasks(data);
        } catch (error) {
            console.error("Failed to fetch tasks", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <TaskContext.Provider value={{ tasks, loading, fetchTasks }}>
            {children}
        </TaskContext.Provider>
    );
};

// 3. Export the Custom Hook
export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) throw new Error("useTasks must be used within a TaskProvider");
    return context;
};
