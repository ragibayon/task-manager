export interface ResponseModel<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface ErrorResponseModel {
  error: {
    code: number;
    message: string;
  };
}
export default ResponseModel;
