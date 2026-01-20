import React, { 
    type ChangeEvent, 
    type Dispatch, 
    type FormEvent, 
    type ReactNode, 
    type RefObject 
} from "react";

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
    selectedDay: string | null;
    setParamsTodo: Dispatch<React.SetStateAction<ParamsTodoType>>;
    handleCheckBox: (day: string) => void;
    handleSubmit : (e: React.FormEvent<HTMLFormElement>) => void;
};

export type InputType = {
    type: string;
    name: string;
    value: string;
    readOnly?: boolean;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
};

export type CheckBoxType = {
    params: string;
    checked: boolean;
    handleCheckBox: (day: string) => void;
    children: ReactNode;
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
    editId: number;
    editDate: string;
    editProject: string;
    editListe: string;
    editDelay: string;
    editClient: string;
    editMail: string;
    editPhone: string;
};

export type EditableElement = HTMLInputElement | HTMLTextAreaElement;

export type EditableProps = {
    day: string;
    className?: React.HTMLAttributes<HTMLDivElement>['className'];
    ref: RefObject<EditableElement | null>;
    name: string;
    value: string;
    as?: "input" | "textarea";
    rows?: number;
    cols?: number;
    editBoolParams: boolean;
    editWriteParams: string;
    isDoneParams: boolean;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    onChange: (e: ChangeEvent<EditableElement>) => void;
    onClick: () => void;
};

export type ParamsPriorityTypes = {
    hidePriority: boolean;
    priority: string;
    bgColor: string;
};

export type PriorityType = {
    paramsPriority: ParamsPriorityTypes;
    onClick: () => void;
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