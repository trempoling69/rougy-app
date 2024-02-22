export type GenericRequestResponse<T> = {
  statusCode: string;
  message: string;
  data: T;
};

export type GenericRequestError = {
  status: string;
  message: string;
};
