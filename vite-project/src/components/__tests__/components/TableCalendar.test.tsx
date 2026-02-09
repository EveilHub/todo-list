import { describe, test, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import TableCalendar from '../../TableCalendar';
import type { SetStateAction } from 'react';
import type { Todo } from '../../../lib/definitions';

describe('CreateInputCheckbox snapshot test', () => {
    test('testing CreateInputCheckbox component', () => {
        const { container } = render(
            <TableCalendar todos={[]} setTodos={function (_value: SetStateAction<Todo[]>): void {
                throw new Error('Function not implemented.');
            } } />
        );
        expect(container).toMatchSnapshot();
    });
});