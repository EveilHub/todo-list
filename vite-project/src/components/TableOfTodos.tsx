import type { JSX } from "react";
import "./styles/TableOfTodos.css";

const TableOfTodos = (): JSX.Element => {
    return (
        <div className="table--todos">
            <h3 className="h3--table">Projets</h3>
            <h3 className="h3--table">Tâches</h3>
            <h3 className="h3--table">Délais</h3>
            <h3 className="h3--table">Client</h3>
        </div>
    )
};
export default TableOfTodos;