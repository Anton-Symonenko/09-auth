import axios, { AxiosError } from "axios";

export const api = axios.create({
  baseURL: "https://notehub-api.goit.study",
  withCredentials: true,
});

type ApiErrorResponse = {
  error?: string;
};

export type ApiError = AxiosError<ApiErrorResponse>;
