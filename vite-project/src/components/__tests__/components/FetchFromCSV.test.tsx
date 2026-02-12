import { describe, expect, vi, it, beforeEach } from 'vitest';
import { render, waitFor, fireEvent, screen } from '@testing-library/react';
import type { Todo } from '../../../lib/definitions';
import FetchFromCSV from '../../FetchFromCSV';

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

    it("affiche les todos après un fetch réussi", async () => {
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


    it("affiche 'Aucun projet terminé' si la liste des todos est vide", async () => {
        (globalThis.fetch as any).mockResolvedValueOnce({
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

    it("ne supprime pas un todo si l'utilisateur annule la suppression", async () => {
        // 1) Simuler un fetch initial avec un todo
        (globalThis.fetch as any).mockResolvedValueOnce({
            ok: true,
            json: async () => mockTodos,
        });

        // 2) Simuler une suppression réussie (mais ne l'effectuerons pas)
        (globalThis.fetch as any).mockResolvedValueOnce({
            ok: true,
        });

        // 3) Simuler l'annulation dans le prompt (l'utilisateur choisit "n")
        (globalThis.prompt as any).mockReturnValue("n");

        // Rendre le composant
        const { container } = render(<FetchFromCSV />);

        // Attendre que "Projet A" soit bien rendu avant d'interagir
        await waitFor(() => {
            // Utiliser queryByText avec une expression régulière pour rendre la recherche plus flexible
            expect(screen.getByText(/Projet A/i)).toBeInTheDocument();
        });

        // Afficher le DOM après le rendu pour vérification
        console.log(container.innerHTML);  // Vérifier le contenu complet du DOM

        // Trouver le bouton de suppression et simuler un clic
        const deleteButton = screen.getByRole("button");
        fireEvent.click(deleteButton);

        // Attendre que l'action de suppression soit annulée et vérifier que "Projet A" est toujours présent
        await waitFor(() => {
            // Rechercher le texte dans l'élément parent (qui est un <li> dans ce cas)
            const todo = container.querySelector('li');
            console.log(todo?.textContent);  // Vérifier le contenu du <li>

            // Vérifier que le projet A est toujours dans le DOM
            expect(todo).toHaveTextContent("Projet A");
        });
    });

    it("appelle la fonction de nettoyage lors du démontage du composant", () => {
        const consoleLogSpy = vi.spyOn(console, 'log');
        
        // Rendre le composant
        const { unmount } = render(<FetchFromCSV />);

        // Vérifier que la fonction de nettoyage n'a pas été appelée au départ
        expect(consoleLogSpy).not.toHaveBeenCalled();

        // Démonter le composant
        unmount();

        // Vérifier que la fonction de nettoyage a été appelée lors du démontage
        expect(consoleLogSpy).toHaveBeenCalledWith("Clean-up CSV");
    });

});