import {
  UpdateTodoRequest,
  UpdateTodoResponse,
  updateTodo,
} from '@/apis/api/todos/updateTodo';
import { isAxiosErrorFromWantedPreOnboardingServer } from '@/apis/utils/isAxiosErrorFromWantedPreOnboardingServer';
import type { Todo } from '@/types/Todo';
import styled from '@emotion/styled';
import { useState } from 'react';

type TodoItemProps = {
  todo: Todo;
  onDeleteBtnClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  setTodoInTodos: (todo: Todo) => void;
};

export const TodoItem = ({
  todo,
  onDeleteBtnClick,
  setTodoInTodos,
}: TodoItemProps) => {
  const [isModifyMode, setIsModifyMode] = useState<boolean>(false);
  const [modifyTodoInput, setModifyTodoInput] = useState<string>(todo.todo);

  const handleCheckboxClick = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();

    const checked = e.target.checked;

    const { id, todo: todoText } = todo;
    const updateTodoRequest: UpdateTodoRequest = {
      todo: todoText,
      isCompleted: checked,
    };
    try {
      const res = await updateTodo(id, updateTodoRequest);
      if (res.status === 200) {
        const { id, todo: todoText, isCompleted } = res.data;
        const newTodo = { id, todo: todoText, isCompleted };
        setTodoInTodos(newTodo);
      }
    } catch (e: unknown) {
      if (isAxiosErrorFromWantedPreOnboardingServer<UpdateTodoResponse>(e)) {
        const { message } = e.response.data;
        alert(message); // TODO: replace with toast
      }
    }
  };

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
    const updateTodoRequest: UpdateTodoRequest = {
      todo: modifyTodoInput,
      isCompleted,
    };
    if (modifyTodoInput === todo.todo) {
      setIsModifyMode(false);
      return;
    }
    try {
      const res = await updateTodo(id, updateTodoRequest);
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
    <Item>
      {!isModifyMode ? (
        <>
          <label>
            <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={handleCheckboxClick}
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
    </Item>
  );
};

const Item = styled.li`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;
