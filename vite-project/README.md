# React + TypeScript + Vite

git diff `<fichier>`

git log -p `<fichier>`

---

## Pour la branch dev

git diff origin/dev

[x] commit

```
const editableConfig = {
  date: {
    label: "Date",
    editWrite: "editDate",
    editBool: "editBoolDate",
    isDone: "isDoneDate",
    ref: "editBoolDate"
  },
  project: {
    label: "Project",
    editWrite: "editProject",
    editBool: "editBoolProject",
    isDone: "isDoneProject",
    ref: "editBoolProject"
  }
} as const;

//--- --- --- --- --- --- 

type EditableKey = keyof typeof editableConfig;
type EditWriteKey = typeof editableConfig[EditableKey]["editWrite"];
type EditBoolKey = typeof editableConfig[EditableKey]["editBool"];

//--- --- --- --- --- ---

const handleSubmitEdit =
  (key: EditableKey, id: string) =>
  (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { editWrite, editBool } = editableConfig[key];

    setTodos(todos.map((todo: Todo) =>
      todo.id === id
        ? { ...todo, [key]: editWriteParams[editWrite] }
        : todo
    ));

    setEditBoolParams(prev => ({
      ...prev,
      [editBool]: !prev[editBool]
    }));
  };

//--- --- --- --- --- ---

const handleChangeEdit =
  (editWrite: EditWriteKey) =>
  (e: ChangeEvent<EditableElement>) => {
    setEditWriteParams(prev => ({
      ...prev,
      [editWrite]: e.target.value
    }));
  };

//--- --- --- --- --- ---

const handleToggleEdit =
  (editBool: EditBoolKey) =>
  () => {
    setEditBoolParams(prev => ({
      ...prev,
      [editBool]: !prev[editBool]
    }));
  };

//--- --- --- --- --- ---

<EditableFields
  onSubmit={handleSubmitEdit("date", todo.id)}
  day={editableConfig.date.label}
  as="input"
  className="input-button-container"
  ref={refs[editableConfig.date.ref]}
  name={editWriteParams.editDate}
  value={editWriteParams.editDate}
  onChange={handleChangeEdit("editDate")}
  onClick={handleToggleEdit("editBoolDate")}
  editBoolParams={editBoolParams.editBoolDate}
  editWriteParams={editWriteParams.editDate}
  isDoneParams={todo.isDoneDate}
/>

<EditableFields
  onSubmit={handleSubmitEdit("project", todo.id)}
  day={editableConfig.project.label}
  as="input"
  className="input-button-container"
  ref={refs[editableConfig.project.ref]}
  name={editWriteParams.editProject}
  value={editWriteParams.editProject}
  onChange={handleChangeEdit("editProject")}
  onClick={handleToggleEdit("editBoolProject")}
  editBoolParams={editBoolParams.editBoolProject}
  editWriteParams={editWriteParams.editProject}
  isDoneParams={todo.isDoneProject}
/>
```
