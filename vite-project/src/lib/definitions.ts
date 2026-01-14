import React, { type Dispatch } from "react";

export type Todo = {
    id: number;
    date: Date;
    project: string;
    liste: string;
    delay: string;
    name: string;
    email: string;
    phone: string;
    dayChoice: daysOfWeek;
	isDone: boolean;
};

export type daysOfWeek = {
    lundi: boolean;
    mardi: boolean;
    mercredi: boolean;
    jeudi: boolean;
    vendredi: boolean;
};

export type CreatorType = {
    dayChoice: daysOfWeek;
    setDayChoice: Dispatch<React.SetStateAction<daysOfWeek>>;
    date: Date;
    setDate: Dispatch<React.SetStateAction<Date>>;
    project: string;
    setProject: Dispatch<React.SetStateAction<string>>;
    liste: string;
    setListe: Dispatch<React.SetStateAction<string>>;
    delay: string;
    setDelay: Dispatch<React.SetStateAction<string>>;
    name: string;
    setName: Dispatch<React.SetStateAction<string>>;
    email: string;
    setEmail: Dispatch<React.SetStateAction<string>>;
    phone: string;
    setPhone: Dispatch<React.SetStateAction<string>>;
    handleCheckBox: (day: keyof daysOfWeek) => void;
    handleSubmit : (e: React.FormEvent<HTMLFormElement>) => void;
};

export type PropsTodoType = {
    todo: Todo;
    todos: Todo[];
    setTodos: Dispatch<React.SetStateAction<Todo[]>>;
};

export type ParamsType = {
    params: string;
};