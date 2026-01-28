import { useEffect } from "react";
import type { TimeSetTimeProps } from "../lib/definitions";

export const useFetchDate = ({setTime}: TimeSetTimeProps): string => {

    const pad = (n: number): string => String(n).padStart(2, "0");

    const getFormattedDate = (): string => {
        const dateNow = new Date();
        const year = dateNow.getFullYear();
        const month = pad(dateNow.getMonth() + 1);
        const dateDay = pad(dateNow.getDate());
        const hour = pad(dateNow.getHours());
        const min = pad(dateNow.getMinutes());

        return `${dateDay}/${month}/${year} ${hour}:${min}`;
    };

    const todayDate: string = getFormattedDate();

    useEffect(() => {
        const updateTime = (): void => {
            setTime(getFormattedDate());
        };

        updateTime();
        const intervalId: number = setInterval(updateTime, 60000);
        return (): void => clearInterval(intervalId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setTime]);

    return todayDate;
};