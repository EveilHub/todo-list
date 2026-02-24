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
                        ) : type === "email" ? (
                            <a href={`mailto:${editWriteParams}?subject=Demande Pont 13&body=Bonjour,%0A%0AJe vous contacte concernant...`} 
                                className="link--custom"
                            >
                                {editWriteParams}
                            </a>
                        ) : name === "editPhone" ? (
                            <a href={`tel:${cleanPhone(editWriteParams)}`} 
                                className="link--custom"
                            >
                                {editWriteParams}
                            </a>
                        ) : (
                            <span>{editWriteParams}</span>
                        )
                    }

                    <div className="div--btn--submit">
                        <button 
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