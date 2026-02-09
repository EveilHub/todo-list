/// <reference types="vitest" />
import { describe, it, expect, test, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import PriorityTodo from '../../PriorityTodo';
import { handleChangePriority } from '../../../../utils/todoFunctions';

describe('PriorityTodo snapshot test', () => {
  test('testing PriorityTodo component', () => {
    const { container } = render(
      <PriorityTodo
        id="test-id"
        paramsPriorityHide={false}
        priorityTodo="option2"
        handleChangePriority={(e) => handleChangePriority(e, "test-id", vi.fn(), vi.fn())}

        onClick={() => console.log("ok")}
      />
    );
    expect(container).toMatchSnapshot();
  });
});


describe("PriorityTodo component", () => {
  it("renders select when paramsPriorityHide is false", () => {
    const handleChangePriority = vi.fn();
    const onClick = vi.fn();

    render(
      <PriorityTodo
        id="test-id"
        paramsPriorityHide={false}
        priorityTodo="option2"
        handleChangePriority={handleChangePriority}
        onClick={onClick}
      />
    );

    // Vérifie que le select est dans le document
    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue("option2");

    // Vérifie les options
    expect(screen.getByText("Priorité 3 (Standard)")).toBeInTheDocument();
    expect(screen.getByText("Priorité 2 (Important)")).toBeInTheDocument();
    expect(screen.getByText("Priorité 1 (Urgent)")).toBeInTheDocument();

    // Test onChange
    fireEvent.change(select, { target: { value: "option1" } });
    expect(handleChangePriority).toHaveBeenCalled();

    // Test onMouseLeave
    fireEvent.mouseLeave(select);
    expect(onClick).toHaveBeenCalled();
  });

  it("renders span when paramsPriorityHide is true", () => {
    const onClick = vi.fn();

    render(
      <PriorityTodo
        id="test-id"
        paramsPriorityHide={true}
        priorityTodo="option2"
        handleChangePriority={() => {}}
        onClick={onClick}
      />
    );

    const span = screen.getByText("PRIORITÉ");
    expect(span).toBeInTheDocument();
    expect(span).toHaveClass("priority--span");

    // Test onMouseEnter
    fireEvent.mouseEnter(span);
    expect(onClick).toHaveBeenCalled();
  });
});
