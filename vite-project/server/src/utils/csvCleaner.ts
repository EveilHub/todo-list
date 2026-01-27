import { Todo } from "../types/definitions";

// util : nettoyage des champs pour le CSV
const cleanCsvField = (value: unknown): unknown => {
    if (typeof value !== "string") return value;
    return value.replace(/\r?\n|\r/g, " | ").trim();
};

// util : nettoyage complet d’un todo
export const cleanTodoForCSV = (todo: Todo): Todo =>
    Object.fromEntries(
            Object.entries(todo).map(([key, value]) => [
            key,
            cleanCsvField(value),
        ]
    )
) as Todo;