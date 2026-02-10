/// <reference types="vitest" />
import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import EditableFields from '../../EditableFields';
import { type FormEvent, type ChangeEvent, createRef } from 'react';
import type { EditableElement } from '../../../../lib/definitions';


describe('DateCalendar snapshot test', () => {
    test('testing DateCalendar component', () => {
        const ref = createRef<EditableElement>();

        const { container } = render(
            <EditableFields ref={ref} name={''} value={''} editBoolParams={false} 
                editWriteParams={''} isDoneParams={false} 
                onSubmit={function (_e: FormEvent<HTMLFormElement>): void {
                    throw new Error('Function not implemented.');
                }} onChange={function (_e: ChangeEvent<EditableElement>): void {
                    throw new Error('Function not implemented.');
                }}
            />
        );
        expect(container).toMatchSnapshot();
    });
});