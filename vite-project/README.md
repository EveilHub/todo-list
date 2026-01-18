# React + TypeScript + Vite


## REUSABLE COMPONENT

```
import { ChangeEvent, FormEvent, RefObject } from "react";
import { GiCrossedSabres } from "react-icons/gi";
import { MdOutlineSaveAlt } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";

type EditableFieldProps = {
  label: string;
  value: string;
  isEditing: boolean;
  isDone: boolean;
  inputRef?: RefObject<HTMLInputElement>;
  onSubmit: (e: FormEvent) => void;
  onSave: () => void;
  onToggleEdit: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const EditableField = ({
  label,
  value,
  isEditing,
  isDone,
  inputRef,
  onSubmit,
  onSave,
  onToggleEdit,
  onChange,
}: EditableFieldProps) => {
  return (
    <form onSubmit={onSubmit} className="form">
      <div className="daycomp-box">
        <h3>{label}</h3>

        <div className="input-btn-container">
          {isEditing ? (
            <input
              ref={inputRef}
              value={value}
              onChange={onChange}
            />
          ) : isDone ? (
            <s>{value}</s>
          ) : (
            <span>{value}</span>
          )}

          <div>
            <button
              type="button"
              onClick={onSave}
              className="save-btn"
            >
              <GiCrossedSabres size={22} />
            </button>

            <button
              type="button"
              onClick={onToggleEdit}
              className="modify-btn"
            >
              {isEditing ? (
                <MdOutlineSaveAlt size={22} />
              ) : (
                <BsPencilSquare size={18} />
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

// ---

<EditableField
  label="Date"
  value={editWriteParams.editDate}
  isEditing={editBoolParams.editBoolDate}
  isDone={todo.isDoneDate}
  inputRef={refs.editBoolDate}
  onSubmit={(e) => handleEditDate(e, todo.id)}
  onSave={() => handleSaveDate(todo.id)}
  onToggleEdit={() =>
    setEditBoolParams(prev => ({
      ...prev,
      editBoolDate: !prev.editBoolDate,
    }))
  }
  onChange={(e) =>
    setEditWriteParams(prev => ({
      ...prev,
      editDate: e.target.value,
    }))
  }
/>


```
