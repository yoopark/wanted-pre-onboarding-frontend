import { API_ROUTES } from '@/apis/constants/API_ROUTES';
import { apiAuthInstance } from '@/apis/instance';

export type CreateTodoRequest = {
  todo: string;
};

export type CreateTodoResponse = {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
};

export const createTodo = (data: CreateTodoRequest) => {
  return apiAuthInstance.post<CreateTodoResponse>(API_ROUTES.TODO, data);
};
