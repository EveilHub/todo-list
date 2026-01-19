import React, { type ChangeEvent, type Dispatch } from "react";

export type ParamsTodoType = {
    date: Date;
    project: string;
    liste: string;
    delay: string;
    name: string;
    email: string;
    phone: string;
};

export type Todo = {
    id: number;
    date: Date;
    project: string;
    liste: string;
    delay: string;
    name: string;
    email: string;
    phone: string;
    selectedDay: string | null;
	isDoneDate: boolean;
	isDoneProject: boolean;
    isDoneListe: boolean;
    isDoneDelay: boolean;
    isDoneClient: boolean;
    isDoneMail: boolean;
    isDonePhone: boolean;
};

export type CreatorType = {
    date: string;
    project: string;
    liste: string;
    delay: string;
    name: string;
    email: string;
    phone: string;
    setParamsTodo: Dispatch<React.SetStateAction<ParamsTodoType>>;
    selectedDay: string | null;
    handleCheckBox: (day: string) => void;
    handleSubmit : (e: React.FormEvent<HTMLFormElement>) => void;
};

export type BooleanEditType = {
    editBoolDate: boolean;
    editBoolProject: boolean;
    editBoolListe: boolean;
    editBoolDelay: boolean;
    editBoolClient: boolean;
    editBoolMail: boolean;
    editBoolPhone: boolean;
};

export type WriteEditType = {
    editDate: string;
    editProject: string;
    editListe: string;
    editDelay: string;
    editClient: string;
    editMail: string;
    editPhone: string;
};

export type PriorityType = {
    priority: string;
    hidePriority: boolean;
    setHidePriority: Dispatch<React.SetStateAction<boolean>>;
    handleChangePriority: (e: ChangeEvent<HTMLSelectElement>) => void;
};

export type PropsTodoType = {
    todo: Todo;
    todos: Todo[];
    setTodos: Dispatch<React.SetStateAction<Todo[]>>;
};

export type ParamsType = {
    params: string;
};