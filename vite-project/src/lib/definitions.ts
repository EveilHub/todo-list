import { 
    type ChangeEvent, 
    type Dispatch, 
    type FormEvent, 
    type HTMLAttributes, 
    type ReactNode, 
    type RefObject, 
    type SetStateAction
} from "react";

export type TimeSetTimeProps = {
    setTime: Dispatch<SetStateAction<string>>;
};

export type ParamsTodoType = {
    date: string;
    project: string;
    liste: string;
    delay: string;
    name: string;
    email: string;
    phone: string;
    priority: string;
};

export type Todo = {
    id: string;
    date: string;
    project: string;
    liste: string;
    delay: string;
    name: string;
    email: string;
    phone: string;
    priority: string;
    selectedDay: string | null;
	isDoneDate: boolean;
	isDoneProject: boolean;
    isDoneListe: boolean;
    isDoneDelay: boolean;
    isDoneClient: boolean;
    isDoneMail: boolean;
    isDonePhone: boolean;
};

export type TodoListType = {
    todos: Todo[];
    setTodos: Dispatch<SetStateAction<Todo[]>>;
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
    priority: string;
    setParamsTodo: Dispatch<SetStateAction<ParamsTodoType>>;
    handleCheckBox: (day: string) => void;
    handleSubmit : (e: FormEvent<HTMLFormElement>) => void;
};

export type InputType = {
    type: string;
    name: string;
    value: string;
    readOnly?: boolean;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    maxLength?: number;
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
    editId: string;
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
    params: string;
    className?: HTMLAttributes<HTMLDivElement>['className'];
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
    bgColor: string;
};

export type PriorityType = {
    priorityTodo: string;
    paramsPriority: ParamsPriorityTypes;
    onClick: () => void;
    handleChangePriority: (e: ChangeEvent<HTMLSelectElement>) => void;
};

export type PropsTodoType = {
    todo: Todo;
    todos: Todo[];
    setTodos: Dispatch<SetStateAction<Todo[]>>;
};