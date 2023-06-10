import { API_ROUTES } from '@/apis/constants/API_ROUTES';
import { apiAuthJsonInstance } from '@/apis/utils';

export type GetTodosRequest = void;

export type GetTodosResponse = {
  // TodoResponseDto로 createTodo & getTodos 추상화 가능?
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}[];

export const getTodos = () => {
  return apiAuthJsonInstance.get<GetTodosResponse>(API_ROUTES.TODO);
};
