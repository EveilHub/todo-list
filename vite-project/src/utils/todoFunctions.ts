import type { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import { type BooleanEditType, type ParamsPriorityTypes, type Todo, type WriteEditType } from "../lib/definitions";
import { callApiClient, callApiDay, callApiDelay, callApiListe, callApiMail, callApiPhone, callApiPriority, callSubmitProject } from "./apiFunctions";

// Priority
export const handleChangePriority = (
    e: ChangeEvent<HTMLSelectElement>, 
    id: string,
    setTodos: Dispatch<SetStateAction<Todo[]>>,
    setParamsPriority: Dispatch<SetStateAction<ParamsPriorityTypes>>
): void => {
        const newPriority = e.target.value;
        setTodos((prev: Todo[]) => prev.map((todo: Todo) => todo.id === id ? {
            ...todo, priority: newPriority
        } : todo
    ));
    callApiPriority(id, newPriority);
    setParamsPriority((prev: ParamsPriorityTypes) => ({
        ...prev, hidePriority: true
    }));
};

// Change day
export const callChangeDay = (
    e: ChangeEvent<HTMLSelectElement>, 
    id: string, 
    setTodos: Dispatch<SetStateAction<Todo[]>>,
    setDayBool: Dispatch<SetStateAction<boolean>>
): void => {
    const newDay = e.target.value;
    setTodos((prev: Todo[]) => prev.map((todo: Todo) => todo.id === id 
        ? { ...todo, selectedDay: newDay } 
        : todo
    ));
    
    callApiDay(id, newDay);

    setDayBool((prev: boolean) => !prev);
};

// Project
export const submitProject = (e: FormEvent<HTMLFormElement>,
    editWriteParams: WriteEditType, 
    setTodos: Dispatch<SetStateAction<Todo[]>>, 
    setEditBoolParams: Dispatch<SetStateAction<BooleanEditType>>, 
    id: string
): void => {
    e.preventDefault();
    setTodos((prev: Todo[]) => prev.map((todo: Todo) => todo.id === id ? { 
        ...todo, project: editWriteParams.editProject
    } : todo));
    
    callSubmitProject(id, editWriteParams);

    setEditBoolParams((prev: BooleanEditType) => ({
        ...prev, editBoolProject: !prev.editBoolProject
    }));
};

// Liste
export const submitListe = async (e: FormEvent<HTMLFormElement>,
    editWriteParams: WriteEditType, 
    setTodos: Dispatch<SetStateAction<Todo[]>>, 
    setEditBoolParams: Dispatch<SetStateAction<BooleanEditType>>, 
    id: string
): Promise<void> => {
    e.preventDefault();
    setTodos((prev: Todo[]) => prev.map((todo: Todo) => todo.id === id ? { 
        ...todo, liste: editWriteParams.editListe  
    } : todo));

    callApiListe(id, editWriteParams);

    setEditBoolParams((prev: BooleanEditType) => ({
        ...prev, editBoolListe: !prev.editBoolListe
    }));
};

// Delay
export const submitDelay = (e: FormEvent<HTMLFormElement>,
    editWriteParams: WriteEditType, 
    setTodos: Dispatch<SetStateAction<Todo[]>>, 
    setEditBoolParams: Dispatch<SetStateAction<BooleanEditType>>, 
    id: string
): void => {
    e.preventDefault();
    setTodos((prev: Todo[]) => prev.map((todo: Todo) => todo.id === id ? { 
        ...todo, delay: editWriteParams.editDelay 
    } : todo));

    callApiDelay(id, editWriteParams);

    setEditBoolParams((prev: BooleanEditType) => ({
        ...prev, editBoolDelay: !prev.editBoolDelay
    }));
};

// Client
export const submitClient = (e: FormEvent<HTMLFormElement>,
    editWriteParams: WriteEditType, 
    setTodos: Dispatch<SetStateAction<Todo[]>>, 
    setEditBoolParams: Dispatch<SetStateAction<BooleanEditType>>, 
    id: string
): void => {
    e.preventDefault();
    setTodos((prev: Todo[]) => prev.map((todo: Todo) => todo.id === id ? { 
        ...todo, client: editWriteParams.editClient
    } : todo));
    
    callApiClient(id, editWriteParams);
    
    setEditBoolParams((prev: BooleanEditType) => ({
        ...prev, editBoolClient: !prev.editBoolClient
    }));
};

// Mail
export const submitMail = (e: FormEvent<HTMLFormElement>,
    editWriteParams: WriteEditType, 
    setTodos: Dispatch<SetStateAction<Todo[]>>, 
    setEditBoolParams: Dispatch<SetStateAction<BooleanEditType>>, 
    id: string
): void => {
    e.preventDefault();
    setTodos((prev: Todo[]) => prev.map((todo: Todo) => todo.id === id ? { 
        ...todo, email: editWriteParams.editMail
    } : todo));

    callApiMail(id, editWriteParams);

    setEditBoolParams((prev: BooleanEditType) => ({
        ...prev, editBoolMail: !prev.editBoolMail
    }));
};

// Phone 
export const submitPhone = (e: FormEvent<HTMLFormElement>,
    editWriteParams: WriteEditType, 
    setTodos: Dispatch<SetStateAction<Todo[]>>, 
    setEditBoolParams: Dispatch<SetStateAction<BooleanEditType>>, 
    id: string
): void => {
    e.preventDefault();
    setTodos((prev: Todo[]) => prev.map((todo: Todo) => todo.id === id ? { 
        ...todo, phone: editWriteParams.editPhone 
    } : todo));

    callApiPhone(id, editWriteParams);

    setEditBoolParams((prev: BooleanEditType) => ({
        ...prev, editBoolPhone: !prev.editBoolPhone
    }));
};