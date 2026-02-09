/// <reference types="vitest" />
import { describe, expect, test, vi, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import CheckboxComp from '../../CheckboxComp';

describe('DateCalendar snapshot test', () => {
    test('testing DateCalendar component', () => {
        const { container } = render(
            <CheckboxComp params={''} checked={false} handleCheckBox={function (_day: string): void {
                throw new Error('Function not implemented.');
            } } children={undefined} />
        );
        expect(container).toMatchSnapshot();
    });
});

describe('CheckboxComp', () => {
  it('renders checkbox with label and children', () => {
    render(
      <CheckboxComp
        params="urgent"
        checked={false}
        handleCheckBox={vi.fn()}
      >
        Urgent
      </CheckboxComp>
    )

    // checkbox présent
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeInTheDocument()
    expect(checkbox).not.toBeChecked()

    // children visibles
    expect(screen.getByText('Urgent')).toBeInTheDocument()
  })

  it('calls handleCheckBox with params on change', () => {
    const handleCheckBox = vi.fn()

    render(
      <CheckboxComp
        params="important"
        checked={true}
        handleCheckBox={handleCheckBox}
      >
        Important
      </CheckboxComp>
    )

    const checkbox = screen.getByRole('checkbox')

    fireEvent.click(checkbox)

    expect(handleCheckBox).toHaveBeenCalledTimes(1)
    expect(handleCheckBox).toHaveBeenCalledWith('important')
  })
})