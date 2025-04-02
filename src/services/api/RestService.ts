import { AxiosInstance, AxiosRequestConfig } from "axios";

import {
  ApiRequestParams,
  ApiResponseData,
  ApiResponseError,
  FormError,
} from "@/types/api";

export default class RestService<T = any> {
  constructor(protected axios: AxiosInstance, protected resource: string) {}

  index<R = T>(params?: ApiRequestParams) {
    return this.axios.get<ApiResponseData<R[]>>(`${this.resource}`, { params });
  }

  show<R = T>(id: string, params: ApiRequestParams = {}) {
    return this.axios.get<ApiResponseData<R>>(`${this.resource}/${id}`, {
      params,
    });
  }

  create<R = T>(
    payload: Partial<T> | FormData,
    options?: AxiosRequestConfig & { formFields?: string[] }
  ) {
    const { formFields = [], ...config } = options || {};
    return new Promise((resolve, reject) => {
      this.axios
        .post<ApiResponseData<R>>(`${this.resource}`, payload, config)
        .then(resolve)
        .catch((error) => reject(this.buildFormErrors(error, formFields)));
    });
  }

  update<R = T>(
    id: string,
    payload: Partial<T> | FormData,
    options?: AxiosRequestConfig & { formFields?: string[] }
  ) {
    const { formFields = [], ...config } = options || {};
    return new Promise((resolve, reject) => {
      this.axios
        .put<ApiResponseData<R>>(`${this.resource}/${id}`, payload, config)
        .then(resolve)
        .catch((error) => reject(this.buildFormErrors(error, formFields)));
    });
  }

  destroy<R = T>(id: string | number, payload?: Partial<T> | FormData) {
    return new Promise((resolve, reject) => {
      this.axios
        .delete<ApiResponseData<R>>(`${this.resource}/${id}`, { data: payload })
        .then(resolve)
        .catch((error) => reject(this.buildFormErrors(error)));
    });
  }

  collection<G = any>(subResource: string, config?: AxiosRequestConfig<G>) {
    return this.axios.request<ApiResponseData<G>>({
      ...config,
      url: `${this.resource}/${subResource}`,
    });
  }

  member<G = any>(
    id: number,
    subResource: string,
    options?: AxiosRequestConfig<G> & { formFields?: string[] }
  ) {
    const { formFields = [], ...config } = options || {};
    return new Promise((resolve, reject) => {
      this.axios
        .request<ApiResponseData<G>>({
          ...config,
          url: `${this.resource}/${id}/${subResource}`,
        })
        .then(resolve)
        .catch((error) => reject(this.buildFormErrors(error, formFields)));
    });
  }

  protected buildFormErrors(
    error: ApiResponseError,
    formFields: string[] = []
  ) {
    const apiErrors = error?.errors ?? [];
    if (!apiErrors.length) {
      return error;
    }

    const formErrors = apiErrors.reduce((acc, { field, code, message }) => {
      if (
        formFields.includes(field) ||
        formFields.some((visibleField) => field.startsWith(`${visibleField}.`))
      ) {
        const errorMessage = `errors:${code}`;
        acc.push({ field, message: errorMessage });
      }
      return acc;
    }, [] as FormError[]);

    if (formErrors.length > 0) {
      error.formErrors = formErrors;
    }

    return error;
  }
}
