import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'; // pour les assertions supplémentaires
import TodosList from '../../TodosList';
import type { SetStateAction } from 'react';
import type { Todo } from '../../../lib/definitions';

describe('Fifth snapshot test', () => {
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
