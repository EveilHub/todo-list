import type { ForwardedRef, JSX } from "react";
import type { EditableProps } from "../../lib/definitions";
import { BsPencilSquare } from "react-icons/bs";
import { MdOutlineSaveAlt } from "react-icons/md";
import "./styles/EditableFields.css";

const EditableFields = (
    {
        params,
        className,
        ref,
        as = "input",
        rows,
        cols,
        name,
        value,
        editBoolParams,
        editWriteParams,
        isDoneParams,
        onSubmit,
        onChange
    }: EditableProps): JSX.Element => {

    return (
        <form 
            onSubmit={onSubmit} 
            className="form"
        >
            <div className="daycomp-box">

                <h3>{params}</h3>
                <div className={className}>

                    {editBoolParams === true ? (
                        as === "textarea" ? (
                        <textarea
                            ref={ref as ForwardedRef<HTMLTextAreaElement>}
                            name={name}
                            value={value}
                            rows={rows}
                            cols={cols}
                            onChange={onChange}
                        />
                        ) : (
                        <input
                            ref={ref as ForwardedRef<HTMLInputElement>}
                            name={name}
                            value={value}
                            onChange={onChange}
                        />
                        )
                        ) : isDoneParams === true ? (
                            <s>{editWriteParams}</s>
                        ) : as === "textarea" ? (
                        <textarea 
                            ref={ref as ForwardedRef<HTMLTextAreaElement>} 
                            value={editWriteParams} 
                            readOnly 
                        />
                        ) : (
                        <span>{editWriteParams}</span>
                        )
                    }

                    <div>
                        <button 
                            type="submit"
                            className="modify-btn"
                        >
                            {editBoolParams === true ? (
                                    <MdOutlineSaveAlt size={22} />
                                ) : (
                                    <BsPencilSquare size={18} />
                                )
                            }
                        </button>
                    </div>

                </div>

            </div>
        </form>
    )
};
export default EditableFields;