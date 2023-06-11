import {
  UpdateTodoRequest,
  UpdateTodoResponse,
  putTodo,
} from '@/apis/api/todos/putTodo';
import { isAxiosErrorFromWantedPreOnboardingServer } from '@/apis/utils/isAxiosErrorFromWantedPreOnboardingServer';
import type { Todo } from '@/types/Todo';
import { useState } from 'react';

type TodoItemProps = {
  todo: Todo;
  onCheckboxClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteBtnClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  setTodoInTodos: (todo: Todo) => void;
};

export const TodoItem = ({
  todo,
  onCheckboxClick,
  onDeleteBtnClick,
  setTodoInTodos,
}: TodoItemProps) => {
  const [isModifyMode, setIsModifyMode] = useState<boolean>(false);
  const [modifyTodoInput, setModifyTodoInput] = useState<string>(todo.todo);

  const handleModifyBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsModifyMode(true);
  };

  const handleChangeModifyTodoInput = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();
    const { value } = e.target;
    setModifyTodoInput(value);
  };

  const handleCancelBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setModifyTodoInput(todo.todo);
    setIsModifyMode(false);
  };

  const handleSubmitBtnClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();

    const { id, isCompleted } = todo;
    const newUpdateTodoRequest: UpdateTodoRequest = {
      todo: modifyTodoInput,
      isCompleted,
    };
    if (modifyTodoInput === todo.todo) {
      return;
    }
    try {
      const res = await putTodo(id, newUpdateTodoRequest);
      if (res.status === 200) {
        const { id, todo: todoText, isCompleted } = res.data;
        const newTodo = { id, todo: todoText, isCompleted };
        setTodoInTodos(newTodo);
      }
    } catch (e: unknown) {
      if (isAxiosErrorFromWantedPreOnboardingServer<UpdateTodoResponse>(e)) {
        const { message } = e.response.data;
        alert(message);
        return; // 수정 실패 시, 수정 모드 유지
      }
    }
    setIsModifyMode(false);
  };

  return (
    <li>
      {!isModifyMode ? (
        <>
          <label>
            <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={onCheckboxClick}
            />
            <span>{todo.todo}</span>
          </label>
          <button data-testid="modify-button" onClick={handleModifyBtnClick}>
            수정
          </button>
          <button data-testid="delete-button" onClick={onDeleteBtnClick}>
            삭제
          </button>
        </>
      ) : (
        <>
          <input
            data-testid="modify-input"
            value={modifyTodoInput}
            onChange={handleChangeModifyTodoInput}
          />
          <button data-testid="submit-button" onClick={handleSubmitBtnClick}>
            제출
          </button>
          <button data-testid="cancel-button" onClick={handleCancelBtnClick}>
            취소
          </button>
        </>
      )}
    </li>
  );
};
