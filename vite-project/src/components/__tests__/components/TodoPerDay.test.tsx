/// <reference types="vitest" />
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import TodoPerDay from '../../TodoPerDay';
import type { SetStateAction } from 'react';
import type { Todo } from '../../../lib/definitions';

describe('TodoPerDay snapshot test', () => {
    test('testing TodoPerDay component', () => {
        const { container } = render(
            <TodoPerDay todo={{
                id: '',
                date: '',
                project: '',
                liste: '',
                delay: '',
                client: '',
                email: '',
                phone: '',
                priority: '',
                selectedDay: undefined,
                isDoneDate: false,
                isDoneProject: false,
                isDoneListe: false,
                isDoneDelay: false,
                isDoneClient: false,
                isDoneMail: false,
                isDonePhone: false
            }} todos={[]} setTodos={function (_value: SetStateAction<Todo[]>): void {
                throw new Error('Function not implemented.');
            } } />
        );
        expect(container).toMatchSnapshot();
    });
});

// Données de test
const mockTodo: Todo = {
    id: '1',
    project: 'Project 1',
    liste: 'List 1',
    delay: '2022-10-01',
    client: 'Client 1',
    email: 'client@example.com',
    phone: '1234567890',
    isDoneProject: false,
    isDoneListe: false,
    isDoneDelay: false,
    isDoneClient: false,
    isDoneMail: false,
    isDonePhone: false,
    priority: 'high',
    date: '2022-10-01',
    selectedDay: 'Monday',
    isDoneDate: false
};

const setTodosMock = vi.fn();

describe('TodoPerDay tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders todo item correctly', () => {
    render(<TodoPerDay todo={mockTodo} todos={[]} setTodos={setTodosMock} />);
    
    // Vérifiez si le projet s'affiche
    expect(screen.getByText('Project 1')).toBeInTheDocument();
    expect(screen.getByText('List 1')).toBeInTheDocument();
    expect(screen.getByText(/client@example.com/i)).toBeInTheDocument();
  });

//   test('handles cross out todo', () => {
//     render(<TodoPerDay todo={mockTodo} todos={[mockTodo]} setTodos={setTodosMock} />);
    
//     const crossOutButton = screen.getByRole('button', { name: /cross out/i });
    
//     fireEvent.click(crossOutButton);
    
//     expect(setTodosMock).toHaveBeenCalledWith(expect.any(Function));
//   });

//   test('handles delete todo', async () => {
//     const { container } = render(<TodoPerDay todo={mockTodo} todos={[mockTodo]} setTodos={setTodosMock} />);

//     const deleteButton = screen.getByRole('button', { name: /delete/i });
    
//     fireEvent.click(deleteButton);

//     expect(setTodosMock).toHaveBeenCalledWith(expect.any(Function));
    
//     // Vous pourriez ajouter des assertions sur les appels d'API si vous mockez les fetch
//   });

//   test('handles change priority', () => {
//     render(<TodoPerDay todo={mockTodo} todos={[mockTodo]} setTodos={setTodosMock} />);

//     const prioritySelect = screen.getByLabelText(/priority/i); // Assurez-vous que ce label existe
//     fireEvent.change(prioritySelect, { target: { value: 'low' } });

//     expect(setTodosMock).toHaveBeenCalled();
//   });

//   test('toggles visibility of client/mail/phone fields', () => {
//     render(<TodoPerDay todo={mockTodo} todos={[mockTodo]} setTodos={setTodosMock} />);
    
//     const toggleButton = screen.getByRole('button', { name: /toggle visibility/i }); // Ajustez selon votre code
    
//     fireEvent.click(toggleButton);
    
//     expect(screen.getByText(/client 1/i)).toBeVisible(); // Vérifiez que les éléments sont visibles
//   });
});
