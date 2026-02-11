import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TodosList from '../../TodosList';
import type { SetStateAction } from 'react';
import type { Todo } from '../../../lib/definitions';
import { sortTodosByPriorityAndDelay } from '../../../utils/fonctions';

describe('TodosList snapshot test', () => {
  test('testing TodosList component', () => {
    const mockSetTodos = (_value: SetStateAction<Todo[]>) => {};
    const { container } = render(
      <TodosList
        className={''}
        todos={[]}
        setTodos={mockSetTodos}
      />
    );
    expect(container).toMatchSnapshot();
  });
});

const mockedSortTodos = vi.mocked(sortTodosByPriorityAndDelay);

vi.mock('../../../utils/fonctions', () => ({
  sortTodosByPriorityAndDelay: vi.fn()
}));

vi.mock('../../TodoPerDay', () => ({
  default: ({ todo }: any) => (
    <div data-testid="todo-item">{todo.title}</div>
  )
}));

const todos: Todo[] = [
  { id: 1, title: 'Low priority' },
  { id: 2, title: 'High priority' }
] as any;

const sortedTodos: Todo[] = [
  { id: 2, title: 'High priority' },
  { id: 1, title: 'Low priority' }
] as any;

test('sorts todos and renders them in sorted order', () => {
  mockedSortTodos.mockReturnValue(sortedTodos);

  render(
    <TodosList
      className="todos"
      todos={todos}
      setTodos={vi.fn()}
    />
  );

  expect(mockedSortTodos).toHaveBeenCalledWith(todos);

  const items = screen.getAllByTestId('todo-item');
  expect(items[0]).toHaveTextContent('High priority');
  expect(items[1]).toHaveTextContent('Low priority');
});