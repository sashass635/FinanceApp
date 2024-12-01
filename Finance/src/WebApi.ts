import axios from "axios";
import { createContext, useContext } from "react";

const create = () => {
  const baseURL = "http://localhost:8008/api/account";

  const login = (login: string, password: string) => {
    return axios.post(`${baseURL}/login`, { login, password });
  };

  const register = (login: string, password: string) => {
    return axios.post(`${baseURL}/auth`, { login, password });
  };

  const deleteAccount = (id: string) => {
    return axios.delete(`${baseURL}/${id}`);
  };

  return { login, register, deleteAccount };
};

export const WebApi = { create };
export type WebApi = ReturnType<typeof create>;

const WebApiContext = createContext<WebApi | undefined>(undefined);

export const WebApiProvider = WebApiContext.Provider;

export const useWebApi = () => {
  const context = useContext(WebApiContext);
  if (context === undefined) {
    throw Error("WebApi context not found in ancestors");
  }
  return context;
};
