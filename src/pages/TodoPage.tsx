import { deleteTodo } from '@/apis/api/todos/deleteTodo';
import { getTodos } from '@/apis/api/todos/getTodos';
import {
  CreateTodoRequest,
  CreateTodoResponse,
  postTodo,
} from '@/apis/api/todos/postTodo';
import { UpdateTodoRequest, putTodo } from '@/apis/api/todos/putTodo';
import { isAxiosErrorFromWantedPreOnboardingServer } from '@/apis/utils/isAxiosErrorFromWantedPreOnboardingServer';
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

  const handleCheckboxClick = async (
    e: React.ChangeEvent<HTMLInputElement>,
    todo: Todo,
  ) => {
    e.preventDefault();

    const checked = e.target.checked;

    const { id, todo: todoText } = todo;
    const newUpdateTodoRequest: UpdateTodoRequest = {
      todo: todoText,
      isCompleted: checked,
    };
    try {
      const res = await putTodo(id, newUpdateTodoRequest);
      if (res.status === 200) {
        const { id, todo: todoText, isCompleted } = res.data;
        const newTodos = todos.map((todo) => {
          if (todo.id === id) {
            const newTodo: Todo = { id, todo: todoText, isCompleted };
            return newTodo;
          }
          return todo;
        });
        setTodos(newTodos);
      }
    } catch (e: unknown) {
      if (isAxiosErrorFromWantedPreOnboardingServer(e)) {
        const { message } = e.response.data;
        alert(message); // TODO: replace with toast
      }
    }
  };

  const handleDeleteBtnClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number,
  ) => {
    e.preventDefault();

    try {
      const res = await deleteTodo(id);
      if (res.status === 204) {
        alert('삭제되었습니다.');
        const newTodos = todos.filter((todo) => todo.id !== id);
        setTodos(newTodos);
      }
    } catch (e: unknown) {
      if (isAxiosErrorFromWantedPreOnboardingServer(e)) {
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
        if (isAxiosErrorFromWantedPreOnboardingServer(e)) {
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
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.isCompleted}
                onChange={(e) => handleCheckboxClick(e, todo)}
              />
              <span>{todo.todo}</span>
            </label>
            <button data-testid="modify-button">수정</button>
            <button
              data-testid="delete-button"
              onClick={(e) => handleDeleteBtnClick(e, todo.id)}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TodoPage;
