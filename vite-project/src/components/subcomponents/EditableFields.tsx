import type { JSX } from "react";
import type { EditableProps } from "../../lib/definitions";
import { BsPencilSquare } from "react-icons/bs";
import { MdOutlineSaveAlt } from "react-icons/md";
import "./styles/EditableFields.css";

const EditableFields = (
    {
        day,
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
        onChange,
        onClick
    }: EditableProps): JSX.Element => {

    const Field = as;

    return (
        <form 
            onSubmit={onSubmit} 
            className="form"
        >
            <div className="daycomp-box">

                <h3>{day}</h3>
                <div className={className}>

                    {editBoolParams === true ? (
                        <Field 
                            ref={ref as any}
                            name={name}
                            value={value}
                            onChange={onChange}
                            rows={as === "textarea" ? rows : undefined}
                            cols={as === "textarea" ? cols : undefined}
                        />
                        ) : isDoneParams === true ? (
                            <s>{editWriteParams}</s>
                        ) : as === "textarea" ? (
                            <textarea value={editWriteParams} readOnly />
                        ) : (
                            <span>{editWriteParams}</span>
                        )}

                        {/* ) : isDoneParams === true ? (
                            <s>{editWriteParams}</s>
                        ) : (
                            <span>
                                {editWriteParams}
                            </span>
                        )
                    } */}

                    <div>
                        <button 
                            type="button" 
                            onClick={onClick}
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