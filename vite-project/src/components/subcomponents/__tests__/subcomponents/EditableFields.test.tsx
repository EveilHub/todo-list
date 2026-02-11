/// <reference types="vitest" />
import { type FormEvent, type ChangeEvent, createRef } from 'react';
import { describe, expect, it, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import EditableFields from '../../EditableFields';
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

describe("", () => {
    it("affiche un input editable quand editBoolParams est true", () => {
        const ref = createRef<EditableElement>();
        render(
            <EditableFields
                className="test"
                as="input"
                name="test"
                value="hello"
                editBoolParams={true}
                editWriteParams="hello"
                isDoneParams={false}
                onSubmit={vi.fn()}
                onChange={vi.fn()} 
                ref={ref}
            />
        );
        expect(screen.getByDisplayValue("hello")).toBeInTheDocument();
        expect(screen.getByTestId("submit-btn")).toBeInTheDocument();
    });

    it("affiche le texte barré quand isDoneParams est true", () => {
        const ref = createRef<EditableElement>();
        render(
            <EditableFields
                className="test"
                as="input"
                name="test"
                value="hello"
                editBoolParams={false}
                editWriteParams="Task done"
                isDoneParams={true}
                onSubmit={vi.fn()}
                onChange={vi.fn()}
                ref={ref}
            />
        );
        const strike = screen.getByText("Task done");
        expect(strike.tagName).toBe("S");
    });

    it("affiche un span en lecture simple", () => {
        const ref = createRef<EditableElement>();
        render(
            <EditableFields
                className="test"
                as="input"
                name="test"
                value="hello"
                editBoolParams={false}
                editWriteParams="Read only"
                isDoneParams={false}
                onSubmit={vi.fn()}
                onChange={vi.fn()}
                ref={ref}
            />
        );
        expect(screen.getByText("Read only").tagName).toBe("SPAN");
    });

    it("affiche un textarea readonly si as='textarea' en mode lecture", () => {
        const ref = createRef<EditableElement>();
        render(
            <EditableFields
                className="test"
                as="textarea"
                name="test"
                value="hello"
                editBoolParams={false}
                editWriteParams="Long text"
                isDoneParams={false}
                onSubmit={vi.fn()}
                onChange={vi.fn()}
                ref={ref}
            />
        );
        const textarea = screen.getByDisplayValue("Long text");
        expect(textarea).toHaveAttribute("readonly");
    });

    it("affiche un textarea editable quand editBoolParams est true", () => {
        const ref = createRef<EditableElement>();
        render(
            <EditableFields
                className="test"
                as="textarea"
                name="test"
                value="textarea test"
                editBoolParams={true}
                editWriteParams="textarea test"
                isDoneParams={false}
                onSubmit={vi.fn()}
                onChange={vi.fn()} 
                ref={ref}
            />
        );
        expect(screen.getByDisplayValue("textarea test")).toBeInTheDocument();
        expect(screen.getByTestId("submit-btn")).toBeInTheDocument();
    });

})