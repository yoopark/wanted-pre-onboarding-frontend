import { Todo } from '@/types/Todo';
import { useState } from 'react';

const TodoPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <>
      <h1>TODO</h1>
      <input data-testid="new-todo-input" />
      <button data-testid="new-todo-add-button">추가</button>
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
