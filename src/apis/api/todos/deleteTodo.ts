import { API_ROUTES } from '@/apis/constants/API_ROUTES';
import { apiAuthInstance } from '@/apis/instance';

export type DeleteTodoRequest = void;

export type DeleteTodoResponse = void;

export const deleteTodo = (id: number) => {
  return apiAuthInstance.delete<DeleteTodoResponse>(`${API_ROUTES.TODO}/${id}`);
};
