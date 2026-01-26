# React + TypeScript + Vite

git diff `<fichier>`

git log -p `<fichier>`

---

## Sur branch dev

git diff origin/dev

[x] commit


```
? Reusable funciton ?

const handleEditTodo = async (
  e: FormEvent<HTMLFormElement>, id: string, 
  field: 'project' | 'date', value: string): Promise<void> => {
    e.preventDefault();

    setTodos((prev: Todo[]) =>
      prev.map((todo: Todo) => 
        todo.id === id ? { ...todo, [field]: value } : todo
      )
    );

    try {
      await fetch(`http://localhost:3001/api/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ [field]: value }), // Utilisation de la notation de crochets pour définir dynamiquement la clé
      });
    } catch (error: unknown) {
      console.error("Erreur mise à jour TODO", error);
    }

    setEditBoolParams((prev: BooleanEditType) => ({
      ...prev, 
      [`editBool${field.charAt(0).toUpperCase() + field.slice(1)}`]: !prev[`editBool${field.charAt(0).toUpperCase() + field.slice(1)}`]
    }));
};


// Pour modifier le projet
await handleEditTodo(event, id, 'project', editWriteParams.editProject);

// Pour modifier la liste
await handleEditTodo(event, id, 'liste', editWriteParams.editListe);

<EditableFields
  onSubmit={handleSubmitEdit("date", todo.id, editWriteParams.editDate)}
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
  onSubmit={handleSubmitEdit("project", todo.id, editWriteParams.editProject)}
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
