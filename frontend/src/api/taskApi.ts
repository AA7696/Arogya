import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1/tasks";

export const createTask = (taskData: any) => axios.post(`${API_BASE_URL}`, taskData);
export const getTasks = (userId: string) => axios.get(`${API_BASE_URL}/${userId}`);
export const updateTask = (taskId: string, updatedData: any) => axios.patch(`${API_BASE_URL}/${taskId}`, updatedData);
export const deleteTask = (taskId: string) => axios.delete(`${API_BASE_URL}/${taskId}`);