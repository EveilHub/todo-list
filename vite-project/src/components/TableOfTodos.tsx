import type { JSX } from "react";
import "./styles/TableOfTodos.css";

const TableOfTodos = (): JSX.Element => {
    return (
        <div className="table--todos">
            <div className="div--title--projects">
                <h3 className="h3--table t-one">Projets</h3>
            </div>
            <div className="div--title--tasks">
                <h3 className="h3--table t-two">Tâches</h3>
            </div>
            <div className="div--title--delays">
                <h3 className="h3--table t-three">Délais</h3>
            </div>
            <div className="div--title--clients">
                <h3 className="h3--table t-four">Clients</h3>
            </div>
            
        </div>
    )
};
export default TableOfTodos;