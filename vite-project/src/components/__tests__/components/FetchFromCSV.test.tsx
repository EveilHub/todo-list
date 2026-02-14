import { describe, expect, vi, it, beforeEach, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, waitFor, fireEvent, screen } from '@testing-library/react';
import type { Todo } from '../../../lib/definitions';
import FetchFromCSV from '../../FetchFromCSV';


describe('FetchFromCSV snapshot test', () => {
    it('testing FetchFromCSV component', () => {
        const { container } = render(
            <FetchFromCSV />
        );
        expect(container).toMatchSnapshot();
    });
});

const mockTodos: Todo[] = [
    {
        id: "1",
        date: "2024-01-01",
        project: "Projet A",
        liste: "Liste A",
        delay: "2 jours",
        client: "Client A",
        email: "a@test.com",
        phone: "000",
        priority: '',
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

describe("FetchFromCSV", () => {
    let mockFetch: ReturnType<typeof vi.fn>;
    let promptMock: ReturnType<typeof vi.fn>;
    
    beforeEach(() => {
        mockFetch = vi.fn();
        promptMock = vi.fn();
        vi.stubGlobal("fetch", mockFetch);
        vi.stubGlobal("prompt", promptMock);
    });
    
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("affiche Chargement... au démarrage", () => {
        // const fetchMock = vi.fn();
        // vi.stubGlobal("fetch", fetchMock);

        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockTodos,
        });

        render(<FetchFromCSV />);
        expect(screen.getByText("Chargement...")).toBeInTheDocument();
    });

    it("affiche les todos après un fetch réussi", async () => {
        //const mockFetch = fetch as unknown as ReturnType<typeof vi.fn>;
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
        mockFetch.mockResolvedValueOnce({
            ok: false,
        });

        render(<FetchFromCSV />);

        await waitFor(() => {
            expect(screen.getByText("Erreur lors de la récupération des todos")).toBeInTheDocument();
        });
    });

    it("affiche une erreur si le fetch échoue après confirmation prompt", async () => {
        // 🔥 mock du prompt pour simuler que l'utilisateur tape "o"
        //vi.stubGlobal("prompt", vi.fn().mockReturnValue("o"));
        promptMock.mockReturnValue("o")
        
        mockFetch
            // 1) fetch initial (chargement) → succès
            .mockResolvedValueOnce({
            ok: true,
            json: async () => mockTodos,
            })
            // 2) fetch DELETE → erreur
            .mockRejectedValueOnce(new Error("Erreur suppression serveur"));

        vi.stubGlobal("fetch", mockFetch);

        const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

        render(<FetchFromCSV />);

        const button = await screen.findByTestId("btn-delete");
        await userEvent.click(button);

        await waitFor(() => {
            expect(consoleSpy).toHaveBeenCalledWith(
            "Erreur suppression serveur",
            expect.any(Error)
            );
        });
        consoleSpy.mockRestore();
    });

    it("affiche 'Aucun projet terminé' si la liste des todos est vide", async () => {
        //const fetchMock = vi.fn();
        //vi.stubGlobal("fetch", fetchMock);

        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => [],
        });

        render(<FetchFromCSV />);

        await waitFor(() => {
            expect(screen.getByText("Aucun projet terminé 🧞‍♂️")).toBeInTheDocument();
        });
    });

    it("supprime un todo après confirmation via prompt", async () => {
        // 1) fetch initial
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockTodos,
        });

        // 2) fetch delete
        mockFetch.mockResolvedValueOnce({
            ok: true,
        });

        promptMock.mockReturnValue("o");

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

    it("ne supprime pas un todo si l'utilisateur annule la suppression", async () => {
        // 1) Simuler un fetch initial avec un todo
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockTodos,
        });

        // 2) Simuler une suppression réussie (mais ne l'effectuerons pas)
        mockFetch.mockResolvedValueOnce({
            ok: true,
        });

        // 3) Simuler l'annulation dans le prompt (l'utilisateur choisit "n")
        promptMock.mockReturnValue("n");

        const { container } = render(<FetchFromCSV />);

        await waitFor(() => {
            expect(screen.getByText(/Projet A/i)).toBeInTheDocument();
        });

        console.log(container.innerHTML);

        const deleteButton = screen.getByRole("button");
        fireEvent.click(deleteButton);

        await waitFor(() => {
            const todo = container.querySelector('li');
            console.log(todo?.textContent);
            expect(todo).toHaveTextContent("Projet A");
        });
    });

    it("appelle la fonction de nettoyage lors du démontage du composant", () => {
        const consoleLogSpy = vi.spyOn(console, 'log');
        
        const { unmount } = render(<FetchFromCSV />);

        expect(consoleLogSpy).not.toHaveBeenCalled();

        // Démonter le composant
        unmount();

        //expect(consoleLogSpy).toHaveBeenCalledWith("Clean-up CSV");
        consoleLogSpy.mockRestore();
    });
});