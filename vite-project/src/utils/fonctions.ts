import type { Todo } from "../lib/definitions";

const priorityOrder: Record<string, number> = {
    option1: 1,
    option2: 2,
    option3: 3
};

const parseFrenchDateTime = (dateTimeStr: string): number => {
    const [datePart, timePart] = dateTimeStr.split(" ");

    const [day, month, year] = datePart.split("/").map(Number);
    const [hours, minutes] = timePart.split(":").map(Number);

    return new Date(year, month - 1, day, hours, minutes).getTime();
};

export const sortTodosByPriorityAndDelay = (todos: Todo[]) => {
    return [...todos].sort((a, b) => {
        // sort by priority
        const priorityDiff =
            priorityOrder[a.priority] - priorityOrder[b.priority];

        if (priorityDiff !== 0) {
            return priorityDiff;
        }

        // sort by delay (jj/mm/année)
        const delayA = parseFrenchDateTime(a.delay);
        const delayB = parseFrenchDateTime(b.delay);

        console.log(delayA);
        console.log(delayB);

        return delayA - delayB;
    });
};

export const formatPhoneNumber = (value: string): string => {
    const digits = value.replace(/\D/g, "");

    return digits
        .slice(0, 10)
        .replace(/(\d{3})(\d{0,3})(\d{0,2})(\d{0,2})/, (_, a, b, c, d) =>
            [a, b, c, d].filter(Boolean).join(" ")
        );
};