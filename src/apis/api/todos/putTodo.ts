import { API_ROUTES } from '@/apis/constants/API_ROUTES';
import { apiAuthJsonInstance } from '@/apis/utils';

export type UpdateTodoRequest = {
  todo: string;
  isCompleted: boolean;
};

export type UpdateTodoResponse = {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
};

export const putTodo = (id: number, data: UpdateTodoRequest) => {
  return apiAuthJsonInstance.put<UpdateTodoResponse>(
    `${API_ROUTES.TODO}/${id}`,
    data,
  );
};
