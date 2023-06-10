import {
  CreateTodoRequest,
  CreateTodoResponse,
  postTodo,
} from '@/apis/api/todos/postTodo';
import { isAxiosErrorFromWantedPreOnboardingServer } from '@/apis/utils/isAxiosErrorFromWantedPreOnboardingServer';
import { Todo } from '@/types/Todo';
import { useState } from 'react';

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
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <label>
              <input type="checkbox" checked={todo.isCompleted} />
              <span>{todo.todo}</span>
            </label>
            <button data-testid="modify-button">수정</button>
            <button data-testid="delete-button">삭제</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TodoPage;
