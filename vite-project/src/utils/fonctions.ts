import type { Dispatch, SetStateAction } from "react";
import type { ParamsPriorityTypes, Todo } from "../lib/definitions";

// Compare priorities
const priorityOrder: Record<string, number> = {
    option1: 1,
    option2: 2,
    option3: 3
};

// Compare days
const priorityOrderDay: Record<string, number> = {
    lundi: 1, 
    mardi: 2,
    mercredi: 3,
    jeudi: 4,
    vendredi: 5
};

const parseFrenchDateTime = (dateTimeStr: string): number => {
    const [datePart, timePart] = dateTimeStr.split(" ");

    const [day, month, year] = datePart.split("/").map(Number);
    const [hours, minutes] = timePart.split(":").map(Number);

    return new Date(year, month - 1, day, hours, minutes).getTime();
};

export const sortTodosByPriorityAndDelay = (todos: Todo[]): Todo[]  => {
    return [...todos].sort((a, b) => {

        if (!a.selectedDay || !b.selectedDay) {
            return 0;
        };

        // sort by day
        const priorityDay: number =
            priorityOrderDay[a.selectedDay] - priorityOrderDay[b.selectedDay];

        if (priorityDay !== 0) {
            return priorityDay;
        };

        // sort by priority
        const priorityDiff: number =
            priorityOrder[a.priority] - priorityOrder[b.priority];

        if (priorityDiff !== 0) {
            return priorityDiff;
        };

        // sort by delay (jj/mm/année)
        const delayA: number = parseFrenchDateTime(a.delay);
        const delayB: number = parseFrenchDateTime(b.delay);

        return delayA - delayB;
    });
};

// Format input phone number
export const formatPhoneNumber = (value: string): string => {
    const digits: string = value.replace(/\D/g, "");

    return digits
        .slice(0, 10)
        .replace(/(\d{3})(\d{0,3})(\d{0,2})(\d{0,2})/, (_, a, b, c, d) =>
            [a, b, c, d].filter(Boolean).join(" ")
        );
};

// Priority colors
export const changeColor = (
    setParamsPriority: Dispatch<SetStateAction<ParamsPriorityTypes>>, 
    priorityValue: string
): void => {
    switch (priorityValue) {
        case 'option1':
            setParamsPriority((prev: ParamsPriorityTypes) => ({
                ...prev, 
                bgColor: '#115c9a',
                hidePriority: !prev.hidePriority
            }));
            break;
        case 'option2':
            setParamsPriority((prev: ParamsPriorityTypes) => ({
                ...prev,
                bgColor: '#0b3c65',
                hidePriority: !prev.hidePriority
            }));
            break;
        case 'option3':
            setParamsPriority((prev: ParamsPriorityTypes) => ({
                ...prev, 
                bgColor: '#00002f',
                hidePriority: !prev.hidePriority
            }));
            break;
        default:
            setParamsPriority((prev: ParamsPriorityTypes) => ({
                ...prev, 
                bgColor: '#00002f'
            }));
    }
};