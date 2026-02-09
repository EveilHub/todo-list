/// <reference types="vitest" />
import { describe, expect, test } from 'vitest'
import { render,  } from '@testing-library/react'
import TableOfTodos from '../../TableOfTodos';

describe('TableOfTodos snapshot test', () => {
    test('testing TableOfTodos component', () => {
        const { container } = render(
            <TableOfTodos />
        );
        // Snapshot à partir du container DOM
        expect(container).toMatchSnapshot();
    });
});