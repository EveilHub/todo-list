import type { WriteEditType } from "../lib/definitions";

// API Priority
export const callApiPriority = async (id: string, newPriority: string): Promise<void> => {
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

// API Day
export const callApiDay = async (id: string, newDay: string): Promise<void> => {
    try {
        await fetch(`http://localhost:3001/api/todos/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ selectedDay: newDay }),
        });
    } catch (error: unknown) {
        console.error("Erreur mise à jour selectedDay", error);
    };
};

// API Project
export const callSubmitProject = async (id: string, editWriteParams: WriteEditType): Promise<void> => {
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
};

// API Liste
export const callApiListe = async (id: string, editWriteParams: WriteEditType): Promise<void> => {
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
};

// API Delay
export const callApiDelay = async (id: string, editWriteParams: WriteEditType): Promise<void> => {
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
};

// API Delay
export const callApiCalendar = async (id: string, delayValue: string): Promise<void> => {
    try {
        await fetch(`http://localhost:3001/api/todos/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ delay: delayValue }),
        });
    } catch (error: unknown) {
        console.error("Erreur mise à jour delay", error);
    };
};

// API Client
export const callApiClient = async (id: string, editWriteParams: WriteEditType): Promise<void> => {
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
};

// API Mail
export const callApiMail = async (id: string, editWriteParams: WriteEditType): Promise<void> => {
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
};

// API Phone
export const callApiPhone = async (id: string, editWriteParams: WriteEditType): Promise<void> => {
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
};