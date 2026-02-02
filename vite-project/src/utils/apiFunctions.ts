import type { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import type { BooleanEditType, Todo, WriteEditType } from "../lib/definitions";

// Priority
export const handleChangePriority = async (e: ChangeEvent<HTMLSelectElement>, 
    id: string,
    setTodos: Dispatch<SetStateAction<Todo[]>>): Promise<void> => {
        setTodos((prev: Todo[]) => prev.map((todo: Todo) => todo.id === id ? {
            ...todo, priority: e.target.value
        } : todo
    ));

    try {
        await fetch(`http://localhost:3001/api/todos/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ priority: e.target.value }),
        });
    } catch (error: unknown) {
        console.error("Erreur mise à jour date", error);
    };
};

// Date
export const handleEditDate = async (e: FormEvent<HTMLFormElement>, 
    editWriteParams: WriteEditType, 
    setTodos: Dispatch<SetStateAction<Todo[]>>, 
    setEditBoolParams: Dispatch<SetStateAction<BooleanEditType>>, 
    id: string): Promise<void> => {
    e.preventDefault();
    setTodos((prev: Todo[]) => prev.map((todo: Todo) => todo.id === id ? { 
        ...todo, date: editWriteParams.editDate
    } : todo));
    try {
      await fetch(`http://localhost:3001/api/todos/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ date: editWriteParams.editDate }),
      });
    } catch (error: unknown) {
        console.error("Erreur mise à jour date", error);
    };
    setEditBoolParams((prev: BooleanEditType) => ({
        ...prev, 
        editBoolDate: !prev.editBoolDate
    }));
};

// Project
export const handleEditProject = async (e: FormEvent<HTMLFormElement>,
    editWriteParams: WriteEditType, 
    setTodos: Dispatch<SetStateAction<Todo[]>>, 
    setEditBoolParams: Dispatch<SetStateAction<BooleanEditType>>, 
    id: string): Promise<void> => {
    e.preventDefault();
    setTodos((prev: Todo[]) => prev.map((todo: Todo) => todo.id === id ? { 
        ...todo, project: editWriteParams.editProject
    } : todo));
    try {
        await fetch(`http://localhost:3001/api/todos/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ project: editWriteParams.editProject }),
        });
    } catch (error: unknown) {
        console.error("Erreur mise à jour date", error);
    };
    setEditBoolParams((prev: BooleanEditType) => ({
        ...prev, editBoolProject: !prev.editBoolProject
    }));
};

// Liste
export const handleEditListe = async (e: FormEvent<HTMLFormElement>,
    editWriteParams: WriteEditType, 
    setTodos: Dispatch<SetStateAction<Todo[]>>, 
    setEditBoolParams: Dispatch<SetStateAction<BooleanEditType>>, 
    id: string): Promise<void> => {
    e.preventDefault();
    setTodos((prev: Todo[]) => prev.map((todo: Todo) => todo.id === id ? { 
        ...todo, liste: editWriteParams.editListe  
    } : todo));
    try {
        await fetch(`http://localhost:3001/api/todos/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ liste: editWriteParams.editListe }),
        });
    } catch (error: unknown) {
        console.error("Erreur mise à jour date", error);
    };
    setEditBoolParams((prev: BooleanEditType) => ({
        ...prev, editBoolListe: !prev.editBoolListe
    }));
};

// Delay
export const handleEditDelay = async (e: FormEvent<HTMLFormElement>,
    editWriteParams: WriteEditType, 
    setTodos: Dispatch<SetStateAction<Todo[]>>, 
    setEditBoolParams: Dispatch<SetStateAction<BooleanEditType>>, 
    id: string): Promise<void> => {
    e.preventDefault();
    setTodos((prev: Todo[]) => prev.map((todo: Todo) => todo.id === id ? { 
        ...todo, delay: editWriteParams.editDelay 
    } : todo));
    try {
        await fetch(`http://localhost:3001/api/todos/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ delay: editWriteParams.editDelay }),
        });
    } catch (error: unknown) {
        console.error("Erreur mise à jour date", error);
    };
    setEditBoolParams((prev: BooleanEditType) => ({
        ...prev, editBoolDelay: !prev.editBoolDelay
    }));
};
  
// Client
export const handleEditClient = async (e: FormEvent<HTMLFormElement>,
    editWriteParams: WriteEditType, 
    setTodos: Dispatch<SetStateAction<Todo[]>>, 
    setEditBoolParams: Dispatch<SetStateAction<BooleanEditType>>, 
    id: string): Promise<void> => {
    e.preventDefault();
    setTodos((prev: Todo[]) => prev.map((todo: Todo) => todo.id === id ? { 
        ...todo, client: editWriteParams.editClient
    } : todo));
    try {
        await fetch(`http://localhost:3001/api/todos/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ client: editWriteParams.editClient }),
        });
    } catch (error: unknown) {
        console.error("Erreur mise à jour date", error);
    };
    setEditBoolParams((prev: BooleanEditType) => ({
        ...prev, editBoolClient: !prev.editBoolClient
    }));
};

// Mail
export const handleEditMail = async (e: FormEvent<HTMLFormElement>,
    editWriteParams: WriteEditType, 
    setTodos: Dispatch<SetStateAction<Todo[]>>, 
    setEditBoolParams: Dispatch<SetStateAction<BooleanEditType>>, 
    id: string): Promise<void> => {
    e.preventDefault();
    setTodos((prev: Todo[]) => prev.map((todo: Todo) => todo.id === id ? { 
        ...todo, email: editWriteParams.editMail
    } : todo));
    try {
        await fetch(`http://localhost:3001/api/todos/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: editWriteParams.editMail }),
        });
    } catch (error: unknown) {
        console.error("Erreur mise à jour date", error);
    };
    setEditBoolParams((prev: BooleanEditType) => ({
        ...prev, editBoolMail: !prev.editBoolMail
    }));
};

// Phone 
export const handleEditPhone = async (e: FormEvent<HTMLFormElement>,
    editWriteParams: WriteEditType, 
    setTodos: Dispatch<SetStateAction<Todo[]>>, 
    setEditBoolParams: Dispatch<SetStateAction<BooleanEditType>>, 
    id: string): Promise<void> => {
    e.preventDefault();
    setTodos((prev: Todo[]) => prev.map((todo: Todo) => todo.id === id ? { 
        ...todo, phone: editWriteParams.editPhone 
    } : todo));
    try {
        await fetch(`http://localhost:3001/api/todos/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ phone: editWriteParams.editPhone }),
        });
    } catch (error: unknown) {
        console.error("Erreur mise à jour date", error);
    };
    setEditBoolParams((prev: BooleanEditType) => ({
        ...prev, editBoolPhone: !prev.editBoolPhone
    }));
};