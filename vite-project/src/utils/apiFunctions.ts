import type { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import type { BooleanEditType, Todo, WriteEditType } from "../lib/definitions";

// Priority
export const handleChangePriority = async (e: ChangeEvent<HTMLSelectElement>, 
    id: string,
    setTodos: Dispatch<SetStateAction<Todo[]>>
): Promise<void> => {
        const newPriority = e.target.value;
        setTodos((prev: Todo[]) => prev.map((todo: Todo) => todo.id === id ? {
            ...todo, priority: newPriority
        } : todo
    ));
    try {
        await fetch(`http://localhost:3001/api/todos/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ priority: newPriority }),
        });
    } catch (error: unknown) {
        console.error("Erreur mise à jour priority", error);
    };
};

// Project
export const handleEditProject = async (e: FormEvent<HTMLFormElement>,
    editWriteParams: WriteEditType, 
    setTodos: Dispatch<SetStateAction<Todo[]>>, 
    setEditBoolParams: Dispatch<SetStateAction<BooleanEditType>>, 
    id: string
): Promise<void> => {
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
        console.error("Erreur mise à jour project", error);
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
    id: string
): Promise<void> => {
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
        console.error("Erreur mise à jour liste", error);
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
    id: string
): Promise<void> => {
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
        console.error("Erreur mise à jour delay", error);
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
    id: string
): Promise<void> => {
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
        console.error("Erreur mise à jour client", error);
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
    id: string
): Promise<void> => {
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
        console.error("Erreur mise à jour mail", error);
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
    id: string
): Promise<void> => {
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
        console.error("Erreur mise à jour phone", error);
    };
    setEditBoolParams((prev: BooleanEditType) => ({
        ...prev, editBoolPhone: !prev.editBoolPhone
    }));
};