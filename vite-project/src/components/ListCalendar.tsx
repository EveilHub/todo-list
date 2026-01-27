import type { JSX } from "react";
import type { Todo } from "../lib/definitions";
import TableCalendar from "./subcomponents/subCalendar/TableCalendar";

type TodosProps = {
    todos: Todo[];
};

const ListCalendar = ({todos}: TodosProps): JSX.Element => {

    return (
        <div className="main--div--calendar">
    
            <div>
                <h3>Calendar</h3>
            </div>

            <div className="div--calendar">
                <TableCalendar
                    todos={todos}
                />
            </div>
        </div>
    )
}
export default ListCalendar;