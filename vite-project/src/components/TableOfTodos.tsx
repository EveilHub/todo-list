import type { JSX } from "react";
import "./styles/TableOfTodos.css";

const TableOfTodos = (): JSX.Element => {
    return (
        <div className="table--todos">
            <div className="div--title--projects">
                <p className="p--table t-one">Projets</p>
            </div>
            <div className="div--title--tasks">
                <p className="p--table t-two">Tâches</p>
            </div>
            <div className="div--title--delays">
                <p className="p--table t-three">Délais</p>
            </div>
            <div className="div--title--clients">
                <p className="p--table t-four">Clients</p>
            </div>
            
        </div>
    )
};
export default TableOfTodos;