import { API_ROUTES } from '@/apis/constants/API_ROUTES';
import { apiAuthJsonInstance } from '@/apis/utils/instance';

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
  return apiAuthJsonInstance.post<CreateTodoResponse>(API_ROUTES.TODO, data);
};
