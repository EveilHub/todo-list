import type { JSX } from "react";
import "./styles/DateCalendar.css";

type PropsDate = {
    date: Date;
};

const DateCalendar = ({date}: PropsDate): JSX.Element => {
    return (
        <th>
            {date.toLocaleDateString("fr-FR", {
                weekday: "long",
                day: "2-digit",
                month: "2-digit",
            })}
        </th>
    )
};
export default DateCalendar;