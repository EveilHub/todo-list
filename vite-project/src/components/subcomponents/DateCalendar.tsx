import type { JSX } from "react";
import "./styles/DateCalendar.css";

type PropsDate = {
    date: string;
};

const DateCalendar = ({date}: PropsDate): JSX.Element => {
    return (
        <th id={date}>
            {date}
        </th>
    )
};
export default DateCalendar;