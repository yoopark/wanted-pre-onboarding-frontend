import { DeleteTodoResponse, deleteTodo } from '@/apis/api/todos/deleteTodo';
import {
  UpdateTodoRequest,
  UpdateTodoResponse,
  putTodo,
} from '@/apis/api/todos/putTodo';
import { isAxiosErrorFromWantedPreOnboardingServer } from '@/apis/utils/isAxiosErrorFromWantedPreOnboardingServer';
import { Todo } from '@/types/Todo';
import { TodoItem } from './TodoItem';

type TodoListProps = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export const TodoList = ({ todos, setTodos }: TodoListProps) => {
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
      if (isAxiosErrorFromWantedPreOnboardingServer<UpdateTodoResponse>(e)) {
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
        const newTodos = todos.filter((todo) => todo.id !== id); // 204 반환되면 서버에서 삭제된 것이므로, 굳이 refetch할 필요 없이 클라이언트에서만 삭제해줘도 됨
        setTodos(newTodos);
      }
    } catch (e: unknown) {
      if (isAxiosErrorFromWantedPreOnboardingServer<DeleteTodoResponse>(e)) {
        const { message } = e.response.data;
        alert(message); // TODO: replace with toast
      }
    }
  };

  const setTodoInTodos = (newTodo: Todo) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === newTodo.id) {
        return newTodo;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onCheckboxClick={(e) => handleCheckboxClick(e, todo)}
          onDeleteBtnClick={(e) => handleDeleteBtnClick(e, todo.id)}
          setTodoInTodos={setTodoInTodos}
        />
      ))}
    </ul>
  );
};
