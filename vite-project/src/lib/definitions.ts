import React, { type Dispatch } from "react";

export type Day = {
    number: number;
    day: string;
};

export type HollyType = {
    dayNum: number;
    day: string;
    date: string;
    setDate: Dispatch<React.SetStateAction<string>>;
    // heure: string;
    // setHeure: Dispatch<React.SetStateAction<string>>;
    project: string;
    setProject: Dispatch<React.SetStateAction<string>>;
    delay: string;
    setDelay: Dispatch<React.SetStateAction<string>>;
    redraw: string;
    setRedraw: Dispatch<React.SetStateAction<string>>;
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