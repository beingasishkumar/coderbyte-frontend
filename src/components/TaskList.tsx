import axios from 'axios';
import type {Task} from '../types';

const API_BASE = '/api/tasks';

export const taskApi = {
    getAll: () => axios.get<Task[]>(API_BASE),
    getOne: (id: number) => axios.get<Task>(`${API_BASE}/${id}`),
    create: (task: Task) => axios.post<Task>(API_BASE, task),

    // UPDATED: No ID in the URL path. The ID is now expected inside the `task` object body.
    update: (task: Task) => axios.put<Task>(API_BASE, task),

    delete: (id: number) => axios.delete(`${API_BASE}/${id}`),
};
