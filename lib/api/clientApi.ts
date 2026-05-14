import { User } from "@/types/user";
import type { Note } from "../../types/note";
import { nextServer } from "./api";

export interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}
export interface FetchNotesProps {
    page?: number;
    search?: string;
    tag?: string;
}

export interface NotesData {
    title: string;
    content: string;
    tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
}

export type RegisterRequest = {
  email: string;
  password: string;
};



type CheckSessionRequest = {
  success: boolean;
};

export const fetchNotes = async (params?: FetchNotesProps): Promise<FetchNotesResponse> => {
    const res = await nextServer.get<FetchNotesResponse>(`/notes`,  {params: params});
    return res.data;
};

export const fetchNote = async(id: string): Promise<Note> => {
    const res = await nextServer.get<Note>(`/notes/${id}`);
    return res.data;
}

export const createNote = async (data: NotesData): Promise<Note> => {
    const res = await nextServer.post<Note>('/notes', data);
    return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
    const res = await nextServer.delete<Note>(`/notes/${id}`);
    return res.data;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};

export const login = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout')
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};

interface UpdateUserRequest {
    username: string;
}

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await nextServer.patch<User>('/users/me', payload);
  return res.data;
};