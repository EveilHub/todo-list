import type { JSX } from "react";
import "./styles/TableOfTodos.css";

const TableOfTodos = (): JSX.Element => {
    return (
        <div className="table--todos">
            <div className="div--title--projects">
                <h3 className="h3--table">Projets</h3>
            </div>
            <div className="div--title--tasks">
                <h3 className="h3--table">Tâches</h3>
            </div>
            <div className="div--title--delays">
                <h3 className="h3--table">Délais</h3>
            </div>
            <div className="div--title--clients">
                <h3 className="h3--table">Clients</h3>
            </div>
            
        </div>
    )
};
export default TableOfTodos;