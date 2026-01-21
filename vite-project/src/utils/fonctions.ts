import type { Todo } from "../lib/definitions";

const priorityOrder: Record<string, number> = {
    option1: 1,
    option2: 2,
    option3: 3
};

export const sortTodosByPriorityAndDelay = (todos: Todo[]) => {
    return [...todos].sort((a, b) => {
        
        // sort by priority
        const priorityDiff =
            priorityOrder[a.priority] - priorityOrder[b.priority];

        if (priorityDiff !== 0) {
            console.log(priorityDiff);
            return priorityDiff;
        }

        // sort by delay (dd/mm/yyyy)
        const delayA = new Date(a.delay).getTime();
        const delayB = new Date(b.delay).getTime();

        console.log("delayA", delayA);
        console.log("delayB", delayB);

        return delayA - delayB;
    });
};