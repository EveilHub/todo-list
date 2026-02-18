import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TodosList from '../../TodosList';
import type { Todo } from '../../../lib/definitions';
import TodoPerDay from '../../TodoPerDay';

vi.mock('../../TodoPerDay', () => ({
  default: ({ todo }: { todo: Todo }) => (
    <div data-testid="main--div">
      <span>{todo.priority}</span>
      <span>{todo.delay}</span>
    </div>
  ),
}));
// 
// ======= Données =======
const mockTodo: Todo = {
  id: "1",
  client: "John Doe",
  email: "john@mail.com",
  phone: "123456789",
  project: "Project A",
  liste: "List A",
  delay: "2026-01-01",
  priority: "High",
  date: "2026-01-01",
  isDoneClient: false,
  isDoneMail: false,
  isDonePhone: false,
  isDoneProject: false,
  isDoneListe: false,
  isDoneDelay: false,
  selectedDay: "Mardi",
  isDoneDate: false,
};

const mockSetTodos = vi.fn();

it("snapshot avec todo normal", () => {
  const { container } = render(
    <TodoPerDay todo={mockTodo} todos={[mockTodo]} setTodos={mockSetTodos} />
  );
  expect(container).toMatchSnapshot();
});

describe('TodosList', () => {
  it('ne doit rien rendre lorsque la liste des todos est vide', () => {

    render(<TodosList className="test-class" todos={[mockTodo]} setTodos={mockSetTodos} />);

    // Vérifier qu'aucun élément TodoPerDay n'est rendu
    expect(screen.queryAllByText(/option/)).toHaveLength(0);

  });

  it('devrait afficher les todos triés lorsqu\'il y a des todos', () => {
    const todos: Todo[] = [
      {
        id: "1", client: 'Todo 1', priority: "option2", delay: "05/03/2025 09:30",
        date: '',
        project: '',
        liste: '',
        email: '',
        phone: '',
        selectedDay: undefined,
        isDoneDate: false,
        isDoneProject: false,
        isDoneListe: false,
        isDoneDelay: false,
        isDoneClient: false,
        isDoneMail: false,
        isDonePhone: false
      },
      {
        id: "2", client: 'Todo 2', priority: "option1", delay: "10/01/2026 10:10",
        date: '',
        project: '',
        liste: '',
        email: '',
        phone: '',
        selectedDay: undefined,
        isDoneDate: false,
        isDoneProject: false,
        isDoneListe: false,
        isDoneDelay: false,
        isDoneClient: false,
        isDoneMail: false,
        isDonePhone: false
      },
      {
        id: "3", client: 'Todo 3', priority: "option3", delay: "19/02/2026 08:00",
        date: '',
        project: '',
        liste: '',
        email: '',
        phone: '',
        selectedDay: undefined,
        isDoneDate: false,
        isDoneProject: false,
        isDoneListe: false,
        isDoneDelay: false,
        isDoneClient: false,
        isDoneMail: false,
        isDonePhone: false
      },
    ];

    // Mock of sort function (not required, pure function tested in self file)
    const sortTodosMock = vi.fn().mockReturnValue(todos);
    vi.stubGlobal('sortTodosByPriorityAndDelay', sortTodosMock);

    const setTodos = vi.fn();

    render(<TodosList className="test-class" todos={todos} setTodos={setTodos} />);

    // Vérification que les éléments sont rendus avec les bonnes priorités et délais
    expect(screen.getByText('option2')).toBeInTheDocument();
    expect(screen.getByText('05/03/2025 09:30')).toBeInTheDocument();
    expect(screen.getByText('option1')).toBeInTheDocument();
    expect(screen.getByText('10/01/2026 10:10')).toBeInTheDocument();
    expect(screen.getByText('option3')).toBeInTheDocument();
    expect(screen.getByText('19/02/2026 08:00')).toBeInTheDocument();
  });
});