import axios from 'axios';
import type {Task} from '../types';

const API_BASE = '/api/tasks';

export const taskApi = {
    getAll: () => axios.get<Task[]>(API_BASE),
    getOne: (id: number) => axios.get<Task>(`${API_BASE}/${id}`),
    create: (task: Task) => axios.post<Task>(API_BASE, task),
    update: (task: Task) => axios.put<Task>(API_BASE, task),
    delete: (id: number) => axios.delete(`${API_BASE}/${id}`),
};