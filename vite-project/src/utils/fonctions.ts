
export const fetchDate = (): string => {
    const pad = (n: number) => String(n).padStart(2, "0");
    const dateNow: Date = new Date();
    const year: string = pad(dateNow.getFullYear());
    const month: string = pad(dateNow.getMonth() + 1);
    const dateDay: string = pad(dateNow.getDate());
    const hour: string = pad(dateNow.getHours());
    const min: string = pad(dateNow.getMinutes());
    const todayDate: string = `${dateDay}/${month}/${year} ${hour}:${min}`;
    return todayDate;
}