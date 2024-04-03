import axios from 'axios'


const API = axios.create({ baseURL: 'http://localhost:5000' });

export const getMessages = (id: any) => API.get(`/message/${id}`);

export const addMessage = (data: any) => API.post('/message', data);

export const createChat = (data: any) => API.post('/chat', data);

export const userChats = (id: any) => API.get(`/chat/${id}`);

export const findChat = (firstId: any, secondId: any) => API.get(`/chat/find/${firstId}/${secondId}`);

export const getUser = (userId: any) => API.get(`/user/${userId}`);

export const getAllUser = () => API.get('/user')

export const getUserByAcountUserId = (id: any) => API.get(`/user/get-by-account-id/${id}`)