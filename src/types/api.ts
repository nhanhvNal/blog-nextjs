export type ApiPagination = {
  current_page: number;
  per_page: number;
  from: number;
  to: number;
  last_page: number;
  total: number;
};

export type ApiResponseData<T> = {
  data: T;
  pagination?: ApiPagination;
};

export type ApiErrorDetail = {
  field: string;
  code: string;
  message: string;
};

export type FormError = Pick<ApiErrorDetail, "field" | "message">;

export type ApiResponseError = {
  message: string;
  code: string;
  error_code: string;
  status_code: number;
  errors: Array<ApiErrorDetail>;
  formErrors?: FormError[];
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export type ApiRequestParams = {
  page?: number;
  offset?: number;
  sort_column?: string;
  sort_type?: "desc" | "asc";
  [key: string]: any;
};
