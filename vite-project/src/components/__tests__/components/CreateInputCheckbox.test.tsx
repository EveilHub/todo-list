/// <reference types="vitest" />
import { describe, expect, it, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import CreateInputCheckbox from '../../CreateInputCheckbox'
//import { formatPhoneNumber } from '../../../utils/fonctions'

vi.mock('../utils/fonctions', () => ({
  formatPhoneNumber: vi.fn((v: string) => `formatted-${v}`)
}))

//const mockedFormatPhoneNumber = vi.mocked(formatPhoneNumber)

vi.mock('../../__tests__/subcomponents/InputComp', () => ({
  default: ({ name, value, onChange, placeholder }: any) => (
    <input
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      data-testid={`input-${name}`}
    />
  )
}))

describe('CreateInputCheckbox snapshot test', () => {
  it('testing CreateInputCheckbox component', () => {
    const { container } = render(
      <CreateInputCheckbox
        date=""
        priority=""
        project=""
        liste=""
        delay=""
        client=""
        email=""
        phone=""
        setParamsTodo={() => {}}
        selectedDay={undefined}
        handleCheckBox={() => {}}
        handleSubmit={() => {}}
      />
    );
    expect(container).toMatchSnapshot();
  });
});

// mock InputComp
vi.mock('./subcomponents/InputComp', () => ({
  default: ({ name, value, onChange, placeholder }: any) => (
    <input
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      data-testid={`input-${name}`}
    />
  )
}))

// mock CheckboxComp
vi.mock('./subcomponents/CheckboxComp', () => ({
  default: ({ children, handleCheckBox }: any) => (
    <button onClick={handleCheckBox}>{children}</button>
  )
}))

// mock formatPhoneNumber
vi.mock('../utils/fonctions', () => ({
  formatPhoneNumber: vi.fn((v) => `formatted-${v}`)
}))

const baseProps = {
  date: '',
  project: '',
  liste: '',
  delay: '',
  client: '',
  email: '',
  phone: '',
  selectedDay: undefined,
  setParamsTodo: vi.fn(),
  handleCheckBox: vi.fn(),
  handleSubmit: vi.fn()
}

it('updates params on text input change', () => {
  render(<CreateInputCheckbox priority={''} {...baseProps} />)

  const input = screen.getByPlaceholderText('Projet')

  fireEvent.change(input, {
    target: { name: 'project', value: 'My Project' }
  })

  expect(baseProps.setParamsTodo).toHaveBeenCalled()
})

// it('formats phone number before setting params', () => {
//   render(<CreateInputCheckbox priority={''} {...baseProps} />)

//   const input = screen.getByTestId('input-phone')

//   fireEvent.change(input, {
//     target: { name: 'phone', value: '076 673 67 34' }
//   })

//   expect(mockedFormatPhoneNumber).toHaveBeenCalledTimes(1)
//   expect(mockedFormatPhoneNumber).toHaveBeenCalledWith('076 673 67 34')
//   expect(baseProps.setParamsTodo).toHaveBeenCalledTimes(1)
// })

it('calls handleCheckBox with correct day', () => {
  render(<CreateInputCheckbox priority={''} {...baseProps} />)

  fireEvent.click(screen.getByText('Lundi'))

  expect(baseProps.handleCheckBox).toHaveBeenCalledWith('lundi')
})

it('disables submit button when no day is selected', () => {
  render(<CreateInputCheckbox priority={''} {...baseProps} />)

  const button = screen.getByRole('button')
  expect(button).toBeDisabled()
})

it('enables submit button when a day is selected', () => {
  render(
    <CreateInputCheckbox
    priority={''} {...baseProps}
    selectedDay="lundi"    />
  )

  const button = screen.getByRole('button')
  expect(button).not.toBeDisabled()
})

it('calls handleSubmit on form submit', () => {
  render(
    <CreateInputCheckbox
    priority={''} {...baseProps}
    selectedDay="lundi"    />
  )

  fireEvent.submit(screen.getByRole('button'))

  expect(baseProps.handleSubmit).toHaveBeenCalled()
})
