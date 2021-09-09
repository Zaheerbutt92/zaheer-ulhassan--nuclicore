import axios, { AxiosResponse } from "axios";
import { Form } from "../models/form";
import ApiResponse from "../models/response";

axios.defaults.baseURL = "http://localhost:5002/api";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Forms = {
  list: () => requests.get<ApiResponse<Form[]>>("/forms"),
  details: (id:string) => requests.get<ApiResponse<Form>>(`/forms/${id}`),
  create: (form:Form) => requests.post<ApiResponse<Form>>('/forms',form),
  update: (form:Form) => requests.put<ApiResponse<Form>>(`/forms/${form.id}`,form),
  delete: (id:string) => requests.del<ApiResponse<Form>>(`/forms/${id}`)
};

const agent = {
  Forms,
};

export default agent;
