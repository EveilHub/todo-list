import { type Dispatch } from "react";

export type Day = {
    number: number;
    day: string;
};

export type HollyType = {
    dayNum: number;
    day: string;
    date: string;
    setDate: Dispatch<React.SetStateAction<string>>;
    heure: string;
    setHeure: Dispatch<React.SetStateAction<string>>;
    tache: string;
    setTache: Dispatch<React.SetStateAction<string>>;
    delais: string;
    setDelais: Dispatch<React.SetStateAction<string>>;
    reconduite: string;
    setReconduite: Dispatch<React.SetStateAction<string>>;
    name: string;
    setName: Dispatch<React.SetStateAction<string>>;
    phone: string;
    setPhone: Dispatch<React.SetStateAction<string>>;
};

export type ParamsType = {
    params: string;
    setParams: Dispatch<React.SetStateAction<string>>;
};