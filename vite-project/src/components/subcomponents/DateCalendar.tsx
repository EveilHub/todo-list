import type { JSX } from "react";
import "./styles/DateCalendar.css";

type PropsDate = {
    date: Date;
};

const DateCalendar = ({date}: PropsDate): JSX.Element => {

    const jour: string = date.toLocaleDateString("fr-FR", {
        weekday: "long"
    });

    return (
        <th>
            <div className="jour-th">
                {jour}
            </div>
        </th>
    )
};
export default DateCalendar;