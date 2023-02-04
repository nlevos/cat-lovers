import axios, { AxiosError, AxiosResponse } from "axios";
import { CatImage } from "../models/catImage";

axios.defaults.baseURL = "https://api.thecatapi.com/v1";
axios.defaults.headers.common["x-api-key"] =
  "live_uwtQvweVhqPhkodUbKPGw1Vc0sUAIt20oQRrFp2JHPEQVR8S0DaEcwL1nAz69CGQ";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const CatImages = {
  list: (limit: number) =>
    requests.get<CatImage[]>(`/images/search?limit=${limit}`),
  // get: (params: Audience) =>
  //   requests.post<Result<Audience>>("/audiences/create", params),
  // // createSchedule: (params: Schedule) =>
  // //   requests.post<Result<Schedule>>("/schedules/create", params),
  // delete: (params: CommonIdParams) =>
  //   requests.post<Result<boolean>>("/audiences/delete", params),
  // // deleteReportSchedule: (params: CommonIdParams) =>
  // //   requests.post<Result<boolean>>("/reports/delete_schedule", params),
  // // deleteSchedule: (params: CommonIdParams) =>
  // //   requests.post<Result<boolean>>("/schedules/delete", params),
  // list: () => requests.get<Result<Audience[]>>("/audiences/list"),
  // // listSchedules: () => requests.get<Result<Schedule[]>>("/schedules/list"),
  // load: (id: string) => requests.get<Result<Audience>>(`/audiences/${id}`),
  // // pauseReportSchedule: (params: CommonIdParams) =>
  // //   requests.post<Result<boolean>>("/reports/pause_schedule", params),
  // rename: (params: CommonRenameParams) =>
  //   requests.post<Result<boolean>>("/audiences/rename", params),
  // // startReportSchedule: (params: CommonIdParams) =>
  // //   requests.post<Result<boolean>>("/reports/start_schedule", params),
  // update: (params: Audience) =>
  //   requests.post<Result<Audience>>("/audiences/update", params),
};

const agent = {
  CatImages,
};

export default agent;
