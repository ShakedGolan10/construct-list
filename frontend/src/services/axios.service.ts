import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const BASE_URL: string = process.env.NODE_ENV === 'production' ? '/api/' : '//localhost:3000/api/';

const axiosInstance = Axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const httpService = {
  get<T>(endpoint: string, params?: Record<string, any>, query?: Record<string, any>): Promise<T> {
    return ajax<T>(endpoint, 'GET', params, query);
  },
  post<T>(endpoint: string, data?: any): Promise<T> {
    return ajax<T>(endpoint, 'POST', data);
  },
  put<T>(endpoint: string, data: any): Promise<T> {
    return ajax<T>(endpoint, 'PUT', data);
  },
  delete<T>(endpoint: string, data?: any): Promise<T> {
    return ajax<T>(endpoint, 'DELETE', data);
  },
};

async function ajax<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data: any = null,
  query?: Record<string, any>
): Promise<T> {
  try {
    const config: AxiosRequestConfig = {
      url: `${BASE_URL}${endpoint}${method === 'GET' && data ? `/${data}` : ''}`,
      method,
      data: method !== 'GET' ? data : undefined,
      params: method === 'GET' ? query : undefined,
    };
    const res: AxiosResponse<T> = await axiosInstance(config);
    return res.data;
  } catch (err: any) {
    if (err.response?.status === 401) {
      sessionStorage.clear();
    }
    throw err;
  }
}
