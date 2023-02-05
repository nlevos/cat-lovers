import axios, { AxiosError, AxiosResponse } from "axios";
import { Breed } from "../models/breed";
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

const Breeds = {
  list: () => requests.get<Breed[]>(`/breeds`),
};

const CatImages = {
  list: (limit: number) =>
    requests.get<CatImage[]>(`/images/search?limit=${limit}`),
  listByBreed: (breedId: string, limit: number) =>
    requests.get<CatImage[]>(
      `/images/search?breed_ids=${breedId}&limit=${limit}`
    ),
};

const agent = {
  Breeds,
  CatImages,
};

export default agent;
