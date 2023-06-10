import type { Todo } from '@/types/Todo';
import { useState } from 'react';

type TodoItemProps = {
  todo: Todo;
  onCheckboxClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteBtnClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const TodoItem = ({
  todo,
  onCheckboxClick,
  onDeleteBtnClick,
}: TodoItemProps) => {
  const [isModifyMode, setIsModifyMode] = useState<boolean>(false);
  const [modifyTodoInput, setModifyTodoInput] = useState<string>(todo.todo);

  const handleModifyBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsModifyMode(true);
  };

  const handleSubmitBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    /* 수정 로직 */
    setIsModifyMode(false);
  };

  const handleCancelBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setModifyTodoInput(todo.todo);
    setIsModifyMode(false);
  };

  const handleChangeModifyTodoInput = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();
    const { value } = e.target;
    setModifyTodoInput(value);
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
