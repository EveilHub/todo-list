import { useState, type ForwardedRef, type JSX } from "react";
import type { EditableProps } from "../../lib/definitions";
import { BsPencilSquare } from "react-icons/bs";
import { MdOutlineSaveAlt } from "react-icons/md";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { FaEye } from "react-icons/fa6";
import "./styles/EditableFields.css";

const EditableFields = (
    {
        params,
        className,
        ref,
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
    }: EditableProps): JSX.Element => {

    const [toggle, setToggle] = useState<boolean>(false);

    let newClassName: string | undefined = undefined;

    if (className === "input-button-client" || 
        className === "input-button-mail" || 
        className === "input-button-phone") 
    {
        newClassName = "Done";
    };

    return (
        <form 
            onSubmit={onSubmit} 
            className="form"
        >
            <div className="daycomp-box">

                <div className="title--btn--edit">
                    
                    <p className="title--box">
                        {params}
                    </p>

                    {newClassName === "Done" ? (
                        <div className="div--btn--client">
                            <button
                                type="button"
                                className="mini-btn"
                                onClick={() => setToggle((prev: boolean) => !prev)}
                            >
                                {toggle === false ? (
                                    <FaEye />
                                ) : (
                                    <AiOutlineEyeInvisible />
                                )}                         
                            </button>
                        </div>
                    ) : (
                        null
                    )}
                </div>

                {toggle === false && newClassName !== "Done" ? (
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
                                        <BsPencilSquare size={18} />
                                    )
                                }
                            </button>
                        </div>

                    </div>
                ) : toggle === true && newClassName === "Done" ? (
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
                                        <BsPencilSquare size={18} />
                                    )
                                }
                            </button>
                        </div>

                    </div>
                ) : (
                    null
                )}
            </div>
        </form>
    )
};
export default EditableFields;