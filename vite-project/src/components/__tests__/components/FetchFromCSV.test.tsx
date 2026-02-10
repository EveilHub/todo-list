import { describe, test, expect, vi, it, beforeEach } from 'vitest';
import { render, waitFor, fireEvent, screen } from '@testing-library/react';
import FetchFromCSV from '../../FetchFromCSV';

describe('CreateInputCheckbox snapshot test', () => {
    test('testing CreateInputCheckbox component', () => {
        const { container } = render(
            <FetchFromCSV />
        );
        expect(container).toMatchSnapshot();
    });
});

const mockTodos = [
  {
    id: "1",
    date: "2024-01-01",
    project: "Projet A",
    liste: "Liste A",
    delay: "2 jours",
    client: "Client A",
    email: "a@test.com",
    phone: "000",
  },
];

// describe("FetchFromCSV", () => {
//     beforeEach(() => {
//         // Reset mocks avant chaque test
//         vi.stubGlobal("fetch", vi.fn());
//         vi.stubGlobal("prompt", vi.fn());
//     });

describe("FetchFromCSV", () => {
    beforeEach(() => {
        const mockFetch = vi.fn();
        vi.stubGlobal("fetch", mockFetch);
        vi.stubGlobal("prompt", vi.fn());
    });

    it("affiche Chargement... au démarrage", () => {
        (globalThis.fetch as any).mockResolvedValueOnce({
            ok: true,
            json: async () => mockTodos,
        });

        render(<FetchFromCSV />);
        expect(screen.getByText("Chargement...")).toBeInTheDocument();
    });

    it("affiche les todos après fetch", async () => {
        const mockFetch = fetch as unknown as ReturnType<typeof vi.fn>;

        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockTodos,
        });

        render(<FetchFromCSV />);

        await waitFor(() => {
            expect(screen.getByText(/Projet A/)).toBeInTheDocument();
        });
    });

    it("affiche un message d'erreur si le fetch échoue", async () => {
        (globalThis.fetch as any).mockResolvedValueOnce({
            ok: false,
        });

        render(<FetchFromCSV />);

        await waitFor(() => {
            expect(screen.getByText("Erreur lors de la récupération des todos")).toBeInTheDocument();
        });
    });

    it("supprime un todo après confirmation via prompt", async () => {
        // 1) fetch initial
        (globalThis.fetch as any).mockResolvedValueOnce({
            ok: true,
            json: async () => mockTodos,
        });

        // 2) fetch delete
        (globalThis.fetch as any).mockResolvedValueOnce({
            ok: true,
        });

        (globalThis.prompt as any).mockReturnValue("o");

        render(<FetchFromCSV />);

        await waitFor(() => {
            expect(screen.getByText(/Projet A/)).toBeInTheDocument();
        });

        const deleteButton = screen.getByRole("button");
        fireEvent.click(deleteButton);

        await waitFor(() => {
            expect(screen.queryByText("Projet A")).not.toBeInTheDocument();
        });
    });
});
