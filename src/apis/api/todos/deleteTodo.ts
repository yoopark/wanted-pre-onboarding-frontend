import { API_ROUTES } from '@/apis/constants/API_ROUTES';
import { apiAuthJsonInstance } from '@/apis/instance';

export type DeleteTodoRequest = void;

export type DeleteTodoResponse = void;

export const deleteTodo = (id: number) => {
  return apiAuthJsonInstance.delete<DeleteTodoResponse>(
    `${API_ROUTES.TODO}/${id}`,
  );
};
