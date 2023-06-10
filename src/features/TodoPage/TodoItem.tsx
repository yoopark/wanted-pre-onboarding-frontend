import type { Todo } from '@/types/Todo';

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
  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={onCheckboxClick}
        />
        <span>{todo.todo}</span>
      </label>
      <button data-testid="modify-button">수정</button>
      <button data-testid="delete-button" onClick={onDeleteBtnClick}>
        삭제
      </button>
    </li>
  );
};
