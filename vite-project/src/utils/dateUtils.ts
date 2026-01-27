export const parseDate = (todoDate: string): Date => {
    const [datePart] = todoDate.split(" ");
    const [day, month, year] = datePart.split("/").map(Number);
    return new Date(year, month - 1, day);
};

export const getISOWeekNumber = (date: Date): number => {
    const temp = new Date(date);
    temp.setHours(0, 0, 0, 0);

    temp.setDate(temp.getDate() + 3 - ((temp.getDay() + 6) % 7));
    const week1 = new Date(temp.getFullYear(), 0, 4);

    return (
        1 +
        Math.round(
            ((temp.getTime() - week1.getTime()) / 86400000 -
                3 +
                ((week1.getDay() + 6) % 7)) /
                7
        )
    );
};

export const getWeekDays = (date: Date): Date[] => {
    const monday = new Date(date);
    monday.setDate(date.getDate() - ((date.getDay() + 6) % 7));

    return Array.from({ length: 5 }, (_, i) => {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        return d;
    });
};

export const isSameDay = (d1: Date, d2: Date): boolean => {
    return (
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
    );
};
