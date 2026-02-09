import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TodosList from '../../TodosList';
import type { SetStateAction } from 'react';
import type { Todo } from '../../../lib/definitions';
import { sortTodosByPriorityAndDelay } from '../../../utils/fonctions';

const mockedSortTodos = vi.mocked(sortTodosByPriorityAndDelay);

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

    // Snapshot à partir du container DOM
    expect(container).toMatchSnapshot();
  });
});

vi.mock('../utils/fonctions', () => ({
  sortTodosByPriorityAndDelay: vi.fn()
}));

vi.mock('./TodoPerDay', () => ({
  default: ({ todo }: any) => (
    <div data-testid="todo-item">{todo.title}</div>
  )
}));

const todos = [
  { id: 1, title: 'Low priority' },
  { id: 2, title: 'High priority' }
] as any;

const sortedTodos = [
  { id: 2, title: 'High priority' },
  { id: 1, title: 'Low priority' }
] as any;

// test('sorts todos and renders them in sorted order', () => {
//   mockedSortTodos.mockReturnValue(sortedTodos);

//   render(
//     <TodosList
//       className="todos"
//       todos={todos}
//       setTodos={vi.fn()}
//     />
//   );

//   // fonction appelée avec les bons todos
//   expect(mockedSortTodos).toHaveBeenCalledWith(todos);

//   // rendu dans l’ordre trié
//   const items = screen.getAllByTestId('todo-item'); // ceci devrait fonctionner maintenant
//   expect(items[0]).toHaveTextContent('High priority');
//   expect(items[1]).toHaveTextContent('Low priority');
// });
