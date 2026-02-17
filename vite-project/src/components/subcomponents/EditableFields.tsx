import { forwardRef, type ForwardedRef, type JSX } from "react";
import type { EditableProps } from "../../lib/definitions";
import { BsPencilSquare } from "react-icons/bs";
import { MdOutlineSaveAlt } from "react-icons/md";
import "./styles/EditableFields.css";

const EditableFields = forwardRef<
    HTMLInputElement | HTMLTextAreaElement,
    EditableProps
>(({
    className,
    as = "input",
    rows,
    cols,
    type,
    name,
    value,
    editBoolParams,
    editWriteParams,
    isDoneParams,
    onSubmit,
    onChange
}, ref): JSX.Element => {

    return (
        <form 
            onSubmit={onSubmit} 
            className="form"
        >
            <div className="daycomp-box">

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
                            className="textarea--editable"
                        />
                        ) : (
                        <input
                            data-testid="input--editable"
                            ref={ref as ForwardedRef<HTMLInputElement>}
                            type={type}
                            name={name}
                            value={value}
                            onChange={onChange}
                            className="input--editable"
                        />
                        )
                        ) : isDoneParams === true ? (
                            <s>{editWriteParams}</s>
                        ) : as === "textarea" ? (
                        <textarea 
                            ref={ref as ForwardedRef<HTMLTextAreaElement>}
                            value={editWriteParams}
                            className="textarea--editable"
                            readOnly 
                        />
                        ) : (
                        <span>{editWriteParams}</span>
                        )
                    }

                    <div className="div--btn--submit">
                        <button 
                            data-testid="submit-btn"
                            type="submit"
                            className="modify-btn"
                        >
                            {editBoolParams === true ? (
                                    <MdOutlineSaveAlt size={22} />
                                ) : (
                                    <BsPencilSquare size={16} />
                                )
                            }
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
});
export default EditableFields;