import React, { type Dispatch } from "react";

export type Todo = {
    id: number;
	todo: string;
    date: string;
    project: string;
    liste: string;
    delay: string;
    name: string;
    email: string;
    phone: string;
    derivatedState: daysOfWeek;
	isDone: boolean;
};

export type daysOfWeek = {
    lundi: boolean;
    mardi: boolean;
    mercredi: boolean;
    jeudi: boolean;
    vendredi: boolean;
};

export type Day = {
    number: number;
    day: string;
};

export type CreatorType = {
    dayChoice: daysOfWeek;
    setDayChoice: Dispatch<React.SetStateAction<daysOfWeek>>;
    date: string;
    setDate: Dispatch<React.SetStateAction<string>>;
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
    newOne: string[];
    setNewOne: Dispatch<React.SetStateAction<string[]>>;
    handleCheckBox: (day: keyof daysOfWeek) => void;
    handleSubmit : (e: React.FormEvent) => void;
};

export type HollyType = {
    dayNum: number;
    day: string;
    date: string;
    setDate: Dispatch<React.SetStateAction<string>>;
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
};

export type ParamsType = {
    params: string;
    setParams: Dispatch<React.SetStateAction<string>>;
};