/// <reference types="vitest" />
import { describe, expect, test, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import CheckDay from '../../CheckDay';
import type { ChangeEvent } from 'react';

describe('CheckDay snapshot test', () => {
    test('testing CheckDay component', () => {
        const { container } = render(
            <CheckDay 
                id={''} 
                dayBool={false} 
                selectedDay={undefined} 
                handleChangeDay={function (_e: ChangeEvent<HTMLSelectElement>): void {
                    throw new Error('Function not implemented.');
                }} onClick={function (): void {
                    throw new Error('Function not implemented.');
                }} 
            />
        );
        expect(container).toMatchSnapshot();
    });
});

describe('CheckDay component', () => {
    test('renders select when dayBool is false and handles events', () => {
        const handleChangeDay = vi.fn()
        const onClick = vi.fn()

        render(
        <CheckDay
            id="test-day"
            dayBool={false}
            selectedDay="lundi"
            handleChangeDay={handleChangeDay}
            onClick={onClick}
        />
        )

        // select présent
        const select = screen.getByRole('combobox')
        expect(select).toBeInTheDocument()
        expect(select).toHaveValue('lundi')

        // change
        fireEvent.change(select, { target: { value: 'mardi' } })
        expect(handleChangeDay).toHaveBeenCalled()

        // mouse leave
        fireEvent.mouseLeave(select)
        expect(onClick).toHaveBeenCalled()
    })

    test('renders span when dayBool is true and handles hover', () => {
        const onClick = vi.fn()

        render(
        <CheckDay
            id="test-day"
            dayBool={true}
            selectedDay="mardi"
            handleChangeDay={vi.fn()}
            onClick={onClick}
        />
        )

        // span présent avec texte en majuscules
        const span = screen.getByText('MARDI')
        expect(span).toBeInTheDocument()

        // mouse enter
        fireEvent.mouseEnter(span)
        expect(onClick).toHaveBeenCalled()
    })
})