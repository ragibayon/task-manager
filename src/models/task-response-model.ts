export interface TaskResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface ErrorResponse {
  error: {
    code: number;
    message: string;
  };
}
export default TaskResponse;
