import type { ChangeEvent, FormEvent, JSX, RefObject } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { MdOutlineSaveAlt } from "react-icons/md";
import "./styles/EditableFields.css";

type EditableProps = {
    day: string;
    className?: React.HTMLAttributes<HTMLDivElement>['className'];
    ref: RefObject<HTMLInputElement | null>;
    name: string;
    value: string;
    editBoolParams: boolean;
    editWriteParams: string;
    isDoneParams: boolean;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onClick: () => void;
};

const EditableFields = (
    {
        day,
        className,
        ref,
        name,
        value,
        editBoolParams,
        editWriteParams,
        isDoneParams,
        onSubmit,
        onChange,
        onClick
    }: EditableProps): JSX.Element => {
    return (
        <form 
            onSubmit={onSubmit} 
            className="form"
        >
            <div className="daycomp-box">

                <h3>{day}</h3>
                <div className={className}>

                    {editBoolParams === true ? (
                        <input 
                            ref={ref}
                            name={name}
                            value={value}
                            onChange={onChange}
                        />
                        ) : isDoneParams === true ? (
                            <s>{editWriteParams}</s>
                        ) : (
                            <span>
                                {editWriteParams}
                            </span>
                        )
                    }

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