import { GetTodosResponse, getTodos } from '@/apis/api/todos/getTodos';
import {
  CreateTodoRequest,
  CreateTodoResponse,
  postTodo,
} from '@/apis/api/todos/postTodo';
import { isAxiosErrorFromWantedPreOnboardingServer } from '@/apis/utils/isAxiosErrorFromWantedPreOnboardingServer';
import { TodoList } from '@/features/TodoPage/TodoList';
import { Todo } from '@/types/Todo';
import { useEffect, useState } from 'react';

const TodoPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoInput, setTodoInput] = useState<string>('');

  const handleTodoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTodoInput(value);
  };

  const handleAddBtnClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const newCreateTodoRequest: CreateTodoRequest = {
      todo: todoInput,
    };
    try {
      const res = await postTodo(newCreateTodoRequest);
      if (res.status === 201) {
        const { id, todo, isCompleted } = res.data;
        const newTodo: Todo = { id, todo, isCompleted };
        setTodos([...todos, newTodo]);
        setTodoInput('');
      }
    } catch (e: unknown) {
      if (isAxiosErrorFromWantedPreOnboardingServer<CreateTodoResponse>(e)) {
        const { message } = e.response.data;
        alert(message); // TODO: replace with toast
      }
    }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await getTodos();
        if (res.status === 200) {
          const newTodos = res.data.map(({ id, todo, isCompleted }) => ({
            id,
            todo,
            isCompleted,
          }));
          setTodos(newTodos);
        }
      } catch (e: unknown) {
        if (isAxiosErrorFromWantedPreOnboardingServer<GetTodosResponse>(e)) {
          const { message } = e.response.data;
          alert(message); // TODO: replace with toast
        }
      }
    };
    fetchTodos();
  }, []);

  return (
    <>
      <h1>TODO</h1>
      <input
        data-testid="new-todo-input"
        value={todoInput}
        onChange={handleTodoInputChange}
      />
      <button data-testid="new-todo-add-button" onClick={handleAddBtnClick}>
        추가
      </button>
      <TodoList todos={todos} setTodos={setTodos} />
    </>
  );
};

export default TodoPage;
