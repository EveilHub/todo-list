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
    onChange,
    placeholder
}, ref): JSX.Element => {
    
    const cleanPhone = (phone?: string): string => {
        if (!phone) return "";
        return phone.replace(/\s+/g, "");
    };

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
                                aria-label="editable--txt"
                                value={value}
                                rows={rows}
                                cols={cols}
                                onChange={onChange}
                                className="textarea--editable"
                            />
                        ) : (
                            <input
                                ref={ref as ForwardedRef<HTMLInputElement>}
                                type={type}
                                name={name}
                                aria-label="editable--input"
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
                        aria-label="readonly--txt"
                        value={editWriteParams}
                        className="textarea--not--editable"
                        placeholder={placeholder}
                        readOnly 
                    />
                    ) : type === "email" ? (
                        editWriteParams !== "" ? (
                            <a href={`mailto:${editWriteParams}?subject=Demande Pont 13&body=Bonjour,%0A%0AJe vous contacte concernant...`} 
                                className="link--custom"
                            >
                                {editWriteParams}
                            </a>
                        ) : (
                            <span className="span--placeholder">{placeholder}</span>
                        )
                    ) : name === "editPhone" ? (
                        editWriteParams !== "" ? (
                            <a href={`tel:${cleanPhone(editWriteParams)}`} 
                                className="link--custom"
                            >
                                {editWriteParams}
                            </a>
                        ) : (
                            <span className="span--placeholder">{placeholder}</span>
                        )
                    ) : (
                        editWriteParams !== "" ? (
                            <span>{editWriteParams}</span>
                        ):(
                            <span className="span--placeholder">{placeholder}</span>
                        )
                    )}

                    <div className="div--btn--submit">
                        {editBoolParams === false ? (
                            <button 
                                type="submit"
                                aria-label="btn-modify"
                                className="modify-btn"
                            >
                                <BsPencilSquare size={16} />
                            </button>
                        ) : (
                            <button 
                                type="submit"
                                aria-label="btn-save"
                                className="save-btn"
                            >
                                <MdOutlineSaveAlt size={22} />
                            </button>
                        )}
                    </div>

                </div>
            </div>
        </form>
    )
});
export default EditableFields;