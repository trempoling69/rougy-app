export const API_URL = 'https://api.vps.romain-mourieras.fr';
// export const API_URL = 'http://192.168.1.63:3001';

import * as SecureStore from 'expo-secure-store';
import { GenericRequestError, GenericRequestResponse } from '../type/request';
import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';


interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const requestHeader = async () => {
  const token = await SecureStore.getItemAsync('token');
  return {
    Authorization: `Bearer ${token}`,
  };
};

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

let isRefreshing = false; // Drapeau pour savoir si on est en train de rafraîchir
//eslint-disable-next-line @typescript-eslint/no-explicit-any
let failedQueue: any[] = []; // File d'attente des requêtes échouées pendant le refresh

//eslint-disable-next-line @typescript-eslint/no-explicit-any
const processQueue = (error: any, token: string | null = null) => {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  failedQueue.forEach((prom: any) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};
// Intercepteur pour gérer les erreurs 401 et rafraîchir le token
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError<GenericRequestError>) => {
    const originalRequest = error.config as CustomAxiosRequestConfig | undefined;
    if (originalRequest?.url?.includes('/refresh-tokens')) {
      return Promise.reject(error);
    }
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axiosInstance.post('/api/auth/refresh-tokens', {}, { withCredentials: true });
        const token = data.data.access_token;
        await SecureStore.setItemAsync('token', token);
        isRefreshing = false;

        // Traiter la file d'attente
        processQueue(null, token);

        // Relancer la requête initiale avec le nouveau token
        originalRequest.headers['Authorization'] = `Bearer ${token}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        isRefreshing = false;
        // Rejeter toutes les requêtes en attente avec l'erreur
        processQueue(err, null);
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

const handleReponse = <T>(response: AxiosResponse<T>) => {
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  } else {
    throw new Error(`Request failled with status : ${response.status}`);
  }
};

const handleRequestError = (error: AxiosError<GenericRequestError>) => {
  console.log(error);

  if (error.response) {
    // Erreur de réponse de l'API avec un code de statut
    if (error.response.data) {
      const errorMessage = error.response.data.message || 'Erreur inconnue';
      throw new Error(`Une erreur est survenue: ${errorMessage}`);
    } else {
      const errorMessage = error.response.statusText || 'Erreur inconnue';
      throw new Error(`Une erreur est survenue: ${errorMessage}`);
    }
  } else if (error.request) {
    // La requête a été faite mais pas de réponse a été reçue
    throw new Error('Pas de réponse de la part du serveur');
  } else {
    // Une erreur s'est produite lors de la configuration de la requête
    throw new Error(`Erreur sur la configuration de la requête : ${error.message}`);
  }
};
/* eslint-disable  @typescript-eslint/no-explicit-any */
const get = async <T>(url: string, params: any = {}): Promise<GenericRequestResponse<T>> => {
  try {
    const response = await axiosInstance.get<GenericRequestResponse<T>>(url, {
      params,
      headers: await requestHeader(),
    });
    return handleReponse<GenericRequestResponse<T>>(response);
    /* eslint-disable  @typescript-eslint/no-explicit-any */
  } catch (err: any) {
    return handleRequestError(err);
  }
};

const post = async <T, D>(url: string, data: D): Promise<GenericRequestResponse<T>> => {
  try {
    const response = await axiosInstance.post<GenericRequestResponse<T>>(url, data, { headers: await requestHeader() });
    return handleReponse<GenericRequestResponse<T>>(response);
    /* eslint-disable  @typescript-eslint/no-explicit-any */
  } catch (err: any) {
    return handleRequestError(err);
  }
};

const del = async <T>(url: string): Promise<GenericRequestResponse<T>> => {
  try {
    const response = await axiosInstance.delete<GenericRequestResponse<T>>(url, { headers: await requestHeader() });
    return handleReponse<GenericRequestResponse<T>>(response);
    /* eslint-disable  @typescript-eslint/no-explicit-any */
  } catch (err: any) {
    return handleRequestError(err);
  }
};

const put = async <T, D>(url: string, data: D): Promise<GenericRequestResponse<T>> => {
  try {
    const reponse = await axiosInstance.put<GenericRequestResponse<T>>(url, data, { headers: await requestHeader() });
    return handleReponse<GenericRequestResponse<T>>(reponse);
    /* eslint-disable  @typescript-eslint/no-explicit-any */
  } catch (err: any) {
    return handleRequestError(err);
  }
};
const patch = async <T, D>(url: string, data: D): Promise<GenericRequestResponse<T>> => {
  try {
    const reponse = await axiosInstance.patch<GenericRequestResponse<T>>(url, data, { headers: await requestHeader() });
    return handleReponse<GenericRequestResponse<T>>(reponse);
    /* eslint-disable  @typescript-eslint/no-explicit-any */
  } catch (err: any) {
    return handleRequestError(err);
  }
};

export { get, post, del, put, patch };
