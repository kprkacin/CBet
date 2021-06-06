import axios, { AxiosRequestConfig } from 'axios';
import { toast } from 'react-hot-toast';

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
});

export const createApiCall =
  (config: AxiosRequestConfig, toastSettings?: toastSettings | null) =>
  async () => {
    if (!toastSettings) {
      return api(config);
    }

    const { success, error } = toastSettings;

    try {
      const data = await api(config);
      if (success) {
        toast.success(success);
      }

      return data;
    } catch (e) {
      error
        ? toast.error(error)
        : toast.error(e.response.data.title || e.response.message);

      throw e;
    }
  };

export interface toastSettings {
  success?: string | null;
  error?: string | null;
}
