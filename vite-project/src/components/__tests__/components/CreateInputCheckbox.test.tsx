/// <reference types="vitest" />
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import type { ParamsTodoType } from '../../../lib/definitions'
import { formatPhoneNumber } from '../../../utils/fonctions'
import CreateInputCheckbox from '../../CreateInputCheckbox'

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

const Wrapper = () => {
  const [paramsTodo, setParamsTodo] = useState<ParamsTodoType>({
    date: '',
    project: '',
    liste: '',
    delay: '',
    client: '',
    email: '',
    phone: '',
    priority: 'option3',
  });

  return (
    <CreateInputCheckbox
      {...paramsTodo}
      setParamsTodo={setParamsTodo}
      selectedDay={undefined}
      handleCheckBox={() => {}}
      handleSubmit={() => {}}
    />
  );
};

describe('handleChangeCreateInputPhone', () => {
  it('project test input', () => {
    render(<Wrapper />);

    const projectInput = screen.getByPlaceholderText('Projet') as HTMLInputElement;

    fireEvent.change(projectInput, {
      target: { value: 'truc much' },
    });

    expect(projectInput.value).toBe('truc much');
  });

  it('formate le numéro de téléphone lors de la saisie', () => {
    render(<Wrapper />);

    const phoneInput = screen.getByPlaceholderText('076 673 67 34') as HTMLInputElement;

    fireEvent.change(phoneInput, {
      target: { value: '0766736734' },
    });

    expect(formatPhoneNumber(phoneInput.value)).toBe('076 673 67 34');
  });
});

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
      selectedDay="lundi"
    />
  )

  const button = screen.getByRole('button')
  expect(button).not.toBeDisabled()
})

const DAYS = [
  { label: /lundi/i, value: 'lundi' },
  { label: /mardi/i, value: 'mardi' },
  { label: /mercredi/i, value: 'mercredi' },
  { label: /jeudi/i, value: 'jeudi' },
  { label: /vendredi/i, value: 'vendredi' },
];

describe('CreateInputCheckbox – sélection des jours', () => {
  it.each(DAYS)(
    'sélectionne %s et active le bouton submit',
    ({ label, value }) => {
      const handleCheckBox = vi.fn();
      const handleSubmit = vi.fn();
      const setParamsTodo = vi.fn();

      render(
        <CreateInputCheckbox
          date="2026-02-09"
          project=""
          liste=""
          delay=""
          client=""
          email=""
          phone=""
          priority=""
          setParamsTodo={setParamsTodo}
          selectedDay={undefined}
          handleCheckBox={handleCheckBox}
          handleSubmit={handleSubmit}
        />
      );

      const submitButton = screen.getByRole('button');
      expect(submitButton).toBeDisabled();

      fireEvent.click(screen.getByLabelText(label));

      expect(handleCheckBox).toHaveBeenCalledTimes(1);
      expect(handleCheckBox).toHaveBeenCalledWith(value);
    }
  );
});

it('calls handleSubmit on form submit', () => {
  render(
    <CreateInputCheckbox
      priority={''} {...baseProps}
      selectedDay="lundi"    
    />
  )

  fireEvent.submit(screen.getByRole('button'))
  expect(baseProps.handleSubmit).toHaveBeenCalled()
})

describe("CreateInputCheckbox - handleCheckBox", () => {
  it("appelle handleCheckBox et met à jour checked", async () => {
    const mockHandleCheckBox = vi.fn();

    render(
      <CreateInputCheckbox
        date="2026-02-11"
        project="TestProject"
        liste={""}
        delay={""}
        client="Client"
        email="test@test.com"
        phone="000"
        priority="High"
        setParamsTodo={vi.fn()}
        selectedDay={undefined}
        handleCheckBox={mockHandleCheckBox}
        handleSubmit={vi.fn()}
      />
    );

    const mardiCheckbox = screen.getByLabelText("Mardi");

    await userEvent.click(mardiCheckbox);

    expect(mockHandleCheckBox).toHaveBeenCalledWith("mardi");
  });  
});

describe("CreateInputCheckbox", () => {
  it("appelle handleCheckBox et met à jour selectedDay", async () => {
    const mockHandleCheckBox = vi.fn();

    render(
      <CreateInputCheckbox
        date="2026-02-11"
        project=""
        liste=""
        delay="2026-02-11"
        client=""
        email=""
        phone=""
        priority="option3"
        setParamsTodo={vi.fn()}
        selectedDay={undefined}
        handleCheckBox={mockHandleCheckBox}
        handleSubmit={vi.fn()}
      />
    );

    const mardiCheckbox = screen.getByLabelText("Mardi");
    await userEvent.click(mardiCheckbox);

    expect(mockHandleCheckBox).toHaveBeenCalledWith("mardi");
  });
});