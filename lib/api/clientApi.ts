import type { Note, NoteTag } from "../../types/note";
import { api } from "./api";
import type { User } from "@/types/user";

interface FetchNotesParams {
  page: number;
  search: string;
  tag?: string;
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: NoteTag;
}

const Per_Page = 10;

export const fetchNotes = async ({
  page,
  search,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response = await api.get<FetchNotesResponse>("/notes", {
    params: {
      tag,
      page,
      perPage: Per_Page,
      ...(search.trim() !== "" && { search }),
    },
  });

  return response.data;
};

export const createNote = async (note: CreateNoteParams): Promise<Note> => {
  const response = await api.post<Note>("/notes", note);

  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await api.delete<Note>(`/notes/${noteId}`);

  return response.data;
};

export const fetchNoteById = async (noteId: string): Promise<Note> => {
  const response = await api.get<Note>(`/notes/${noteId}`);
  return response.data;
};

interface RegisterRequest {
  email: string;
  password: string;
}

interface RegisterResponse {
  user: User;
}

export const register = async (
  data: RegisterRequest,
): Promise<RegisterResponse> => {
  const response = await api.post<RegisterResponse>("/auth/register", data);
  return response.data;
};

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  user: User;
}

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/auth/login", data);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await api.get<CheckSessionRequest>("/auth/session");
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await api.get<User>("/auth/me");
  return data;
};
