import { describe, it, expect, vi } from "vitest";
import type { ParamsPriorityTypes, Todo, WriteEditType } from "../../lib/definitions";
import {
  handleChangePriority,
  callChangeDay,
  submitProject,
  submitListe,
  submitDelay,
  submitClient,
  submitMail,
  submitPhone
} from "../todoFunctions";

// MOCK des API
vi.mock("../apiFunctions", () => ({
  callApiPriority: vi.fn(),
  callApiDay: vi.fn(),
  callApiProject: vi.fn(),
  callApiListe: vi.fn(),
  callApiDelay: vi.fn(),
  callApiClient: vi.fn(),
  callApiMail: vi.fn(),
  callApiPhone: vi.fn(),
}));

import {
  callApiPriority,
  callApiDay,
  callApiProject,
  callApiListe,
  callApiDelay,
  callApiClient,
  callApiMail,
  callApiPhone,
} from "../apiFunctions";
import type { ChangeEvent } from "react";

// Mock WriteEditType
const editWriteParams: WriteEditType = {
  editId: "1",
  editProject: "New Project",
  editListe: "New Liste",
  editDelay: "09/11/1928 20:00",
  editClient: "New Client",
  editMail: "test@mail.com",
  editPhone: "0227772288"
};

// Mock initial todo
const mockTodos: Todo[] = [
  {
    id: "1",
    priority: "option1",
    selectedDay: "lundi",
    project: "",
    liste: "",
    delay: "",
    client: "",
    email: "",
    phone: "",
    date: "",
    isDoneDate: false,
    isDoneProject: false,
    isDoneListe: false,
    isDoneDelay: false,
    isDoneClient: false,
    isDoneMail: false,
    isDonePhone: false
  }
];



describe("callChangeDay", () => {

  it('handleChangePriority updates todos and calls API', () => {
      const setTodos = vi.fn();
      const setParamsPriority = vi.fn();
      const e = { target: { value: 'High' } } as ChangeEvent<HTMLSelectElement>;

      handleChangePriority(e, 'todo1', setTodos, setParamsPriority);

      expect(setTodos).toHaveBeenCalled();
      expect(setParamsPriority).toHaveBeenCalled();
      expect(callApiPriority).toHaveBeenCalledWith('todo1', 'High');
  });

  it('callChangeDay toggles setDayBool', () => {
      const setTodos = vi.fn();
      const setDayBool = vi.fn();
      const e = { target: { value: '2026-02-12' } } as any;
      callChangeDay(e, 'todo1', setTodos, setDayBool);

      expect(setDayBool).toHaveBeenCalledWith(expect.any(Function));
  });

  it("should update selectedDay, call API and toggle boolean", () => {
    let todos = [...mockTodos];
    const setTodos = (fn: any) => {
      todos = fn(todos);
    };

    let dayBool = false;
    const setDayBool = (fn: any) => {
      dayBool = fn(dayBool);
    };

    const e = { target: { value: "lundi" } } as any;

    callChangeDay(e, "1", setTodos, setDayBool);

    expect(todos[0].selectedDay).toBe("lundi");
    expect(callApiDay).toHaveBeenCalledWith("1", "lundi");
    expect(dayBool).toBe(true);
  });

  it("should handle null values in paramsPriority", () => {
    let todos = [...mockTodos];

    const setTodos: React.Dispatch<React.SetStateAction<typeof todos>> = (fn) => {
      todos = typeof fn === "function" ? fn(todos) : fn;
    };

    let paramsPriority: ParamsPriorityTypes = {
      hidePriority: false,
      bgColor: "blue",
    };
    
    const setParamsPriority: React.Dispatch<React.SetStateAction<ParamsPriorityTypes>> = (fn) => {
      paramsPriority = typeof fn === "function" ? fn(paramsPriority) : fn;
    };

    const e = { target: { value: "option2" } } as any;

    handleChangePriority(e, "1", setTodos, setParamsPriority);

    expect(todos[0].priority).toBe("option2");
    expect(callApiPriority).toHaveBeenCalledWith("1", "option2");
    expect(paramsPriority.hidePriority).toBe(true);
  });

  it('devrait appeler callApiProject avec les bons paramètres', () => {
    const e = { preventDefault: vi.fn() } as unknown as React.FormEvent<HTMLFormElement>;

    const setTodos = vi.fn();
    const setEditBoolParams = vi.fn();
    const id = '2'; // L'id du todo à modifier

    // Appeler la fonction et l'API
    submitProject(e, editWriteParams, setTodos, setEditBoolParams, id);
    expect(callApiProject).toHaveBeenCalledWith(id, editWriteParams);
  });

  it('devrait appeler callApiListe avec les bons paramètres', () => {
    const e = {
      preventDefault: vi.fn(),
    } as unknown as React.FormEvent<HTMLFormElement>;

    const setTodos = vi.fn();
    const setEditBoolParams = vi.fn();
    const id = '3'; // ID du todo qui doit être modifié

    submitListe(e, editWriteParams, setTodos, setEditBoolParams, id);
    expect(callApiListe).toHaveBeenCalledWith(id, editWriteParams);
  });

  it('devrait appeler callApiClient avec les bons paramètres', () => {
    const e = {
      preventDefault: vi.fn(),
    } as unknown as React.FormEvent<HTMLFormElement>;

    const setTodos = vi.fn();
    const setEditBoolParams = vi.fn();
    const id = '3'; // ID du todo qui doit être modifié

    submitClient(e, editWriteParams, setTodos, setEditBoolParams, id);
    expect(callApiClient).toHaveBeenCalledWith(id, editWriteParams);
  });

  it('Full coverage submitProject', () => {
    const e = {
      preventDefault: vi.fn(),
    } as unknown as React.FormEvent<HTMLFormElement>;

    // Mock de setTodos pour qu'il prenne un callback qui modifie les todos
    const setTodos = vi.fn((callback) => callback([
      { id: '1', project: 'oldProject' },    // Todo qui doit être mis à jour
      { id: '2', project: 'anotherProject' }, // Todo qui ne doit pas être modifié
    ]));

    const setEditBoolParams = vi.fn();
    const id = '1'; // ID du todo que nous voulons modifier

    submitProject(e, editWriteParams, setTodos, setEditBoolParams, id);

    // Vérifiez que setTodos a bien été appelé avec une fonction qui met à jour l'état
    expect(setTodos).toHaveBeenCalledWith(expect.any(Function));

    // Récupérer l'argument fonction qui a été passé à setTodos
    const setTodosCallback = setTodos.mock.calls[0][0]; 

    // Exécuter cette fonction pour voir les modifications qu'elle apporte
    const updatedTodos = setTodosCallback([
      { id: '1', project: 'oldProject' },
      { id: '2', project: 'anotherProject' },
    ]);

    // Vérifiez que la todo avec id '1' a été mise à jour
    expect(updatedTodos).toEqual([
      { id: '1', project: 'New Project' },   // Le projet doit être mis à jour
      { id: '2', project: 'anotherProject' }, // Le todo avec id '2' ne doit pas être modifié
    ]);
  });

  it('Full coverage submitListe', () => {
    const e = {
      preventDefault: vi.fn(),
    } as unknown as React.FormEvent<HTMLFormElement>;

    const setTodos = vi.fn((callback) => callback([
      { id: '1', liste: 'oldListe' },
      { id: '2', liste: 'anotherListe' }, // Todo qui ne doit pas être modifié
    ]));

    const setEditBoolParams = vi.fn();
    const id = '1'; // ID du todo que nous voulons modifier

    submitListe(e, editWriteParams, setTodos, setEditBoolParams, id);

    expect(setTodos).toHaveBeenCalledWith(expect.any(Function));

    const setTodosCallback = setTodos.mock.calls[0][0]; 

    const updatedTodos = setTodosCallback([
      { id: '1', liste: 'oldListe' },
      { id: '2', liste: 'anotherListe' },
    ]);

    expect(updatedTodos).toEqual([
      { id: '1', liste: 'New Liste' }, 
      { id: '2', liste: 'anotherListe' },
    ]);
  });

  it('Full coverage submitDelay', () => {
    const e = {
      preventDefault: vi.fn(),
    } as unknown as React.FormEvent<HTMLFormElement>;

    const setTodos = vi.fn((callback) => callback([
      { id: '1', delay: '08/11/1928 20:00' },
      { id: '2', delay: '10/10/1928 20:20' },
    ]));

    const setEditBoolParams = vi.fn();
    const id = '1';

    submitDelay(e, editWriteParams, setTodos, setEditBoolParams, id);

    expect(setTodos).toHaveBeenCalledWith(expect.any(Function));

    const setTodosCallback = setTodos.mock.calls[0][0]; 

    const updatedTodos = setTodosCallback([
      { id: '1', delay: '08/11/1928 20:00' },
      { id: '2', delay: '10/10/1928 20:20' },
    ]);

    expect(updatedTodos).toEqual([
      { id: '1', delay: '09/11/1928 20:00' }, 
      { id: '2', delay: '10/10/1928 20:20' },
    ]);
  });

  it('Full coverage submitClient', () => {
    const e = {
      preventDefault: vi.fn(),
    } as unknown as React.FormEvent<HTMLFormElement>;

    const setTodos = vi.fn((callback) => callback([
      { id: '1', client: 'oldClient' },
      { id: '2', client: 'anotherClient' },
    ]));

    const setEditBoolParams = vi.fn();
    const id = '1';

    submitClient(e, editWriteParams, setTodos, setEditBoolParams, id);

    expect(setTodos).toHaveBeenCalledWith(expect.any(Function));

    const setTodosCallback = setTodos.mock.calls[0][0]; 

    const updatedTodos = setTodosCallback([
      { id: '1', client: 'oldClient' },
      { id: '2', client: 'anotherClient' },
    ]);

    expect(updatedTodos).toEqual([
      { id: '1', client: 'New Client' }, 
      { id: '2', client: 'anotherClient' },
    ]);
  });

  it('Full coverage submitMail', () => {
    const e = {
      preventDefault: vi.fn(),
    } as unknown as React.FormEvent<HTMLFormElement>;

    const setTodos = vi.fn((callback) => callback([
      { id: '1', email: 'oldEmail@mail.com' },
      { id: '2', email: 'other@mail.com' },
    ]));

    const setEditBoolParams = vi.fn();
    const id = '1';

    submitMail(e, editWriteParams, setTodos, setEditBoolParams, id);

    expect(setTodos).toHaveBeenCalledWith(expect.any(Function));

    const setTodosCallback = setTodos.mock.calls[0][0]; 

    const updatedTodos = setTodosCallback([
      { id: '1', email: 'oldEmail@mail.com' },
      { id: '2', email: 'other@mail.com' },
    ]);

    expect(updatedTodos).toEqual([
      { id: '1', email: 'test@mail.com' }, 
      { id: '2', email: 'other@mail.com' },
    ]);
  });

  it('Full coverage submitPhone', () => {
    const e = {
      preventDefault: vi.fn(),
    } as unknown as React.FormEvent<HTMLFormElement>;

    const setTodos = vi.fn((callback) => callback([
      { id: '1', phone: '0217312899' },
      { id: '2', phone: '0216521717' },
    ]));

    const setEditBoolParams = vi.fn();
    const id = '1';

    submitPhone(e, editWriteParams, setTodos, setEditBoolParams, id);

    expect(setTodos).toHaveBeenCalledWith(expect.any(Function));

    const setTodosCallback = setTodos.mock.calls[0][0]; 

    const updatedTodos = setTodosCallback([
      { id: '1', phone: '0217312899' },
      { id: '2', phone: '0216521717' },
    ]);

    expect(updatedTodos).toEqual([
      { id: '1', phone: '0227772288' }, 
      { id: '2', phone: '0216521717' },
    ]);
  });

  it('Full coverage callChangeDay', () => {
    const e = { target: { value: 'lundi' } } as React.ChangeEvent<HTMLSelectElement>;

    const setTodos = vi.fn((callback) => callback([
      { id: '1', selectedDay: 'mardi' },
      { id: '2', selectedDay: 'jeudi' },
    ]));

    const setDayBool = vi.fn();
    const id = '1';

    callChangeDay(e, id, setTodos, setDayBool);
    expect(setTodos).toHaveBeenCalledWith(expect.any(Function));

    const setTodosCallback = setTodos.mock.calls[0][0]; 
    const updatedTodos = setTodosCallback([
      { id: '1', selectedDay: 'mardi' },
      { id: '2', selectedDay: 'jeudi' },
    ]);
    const newDay = e.target.value;
    expect(updatedTodos).toEqual([
      { id: '1', selectedDay: newDay },
      { id: '2', selectedDay: 'jeudi' },
    ]);
  });





  it('Full coverage handleChangePriority', () => {
    const e = { target: { value: 'option1' } } as React.ChangeEvent<HTMLSelectElement>;

    const setTodos = vi.fn((callback) => callback([
      { id: '1', priority: 'option2' },
      { id: '2', priority: 'option3' },
    ]));

    const setParamsPriority = vi.fn();
    const id = '1';

    handleChangePriority(e, id, setTodos, setParamsPriority);
    expect(setTodos).toHaveBeenCalledWith(expect.any(Function));

    const setTodosCallback = setTodos.mock.calls[0][0]; 
    const updatedTodos = setTodosCallback([
      { id: '1', priority: 'option2' },
      { id: '2', priority: 'option3' },
    ]);
    const newPriority = e.target.value;
    expect(updatedTodos).toEqual([
      { id: '1', priority: newPriority },
      { id: '2', priority: 'option3' },
    ]);
  });



});

// Fonction générique pour tester les submit
const testSubmit = async (
  fn: any,
  apiFn: any,
  key: keyof typeof editWriteParams,
  todoKey: keyof typeof mockTodos[0],
  boolKey: string
) => {
  let todos = [...mockTodos];
  const setTodos = (fn: any) => { todos = fn(todos); };
  let editBoolParams = {
    editBoolProject: false,
    editBoolListe: false,
    editBoolDelay: false,
    editBoolClient: false,
    editBoolMail: false,
    editBoolPhone: false
  };
  const setEditBoolParams = (fn: any) => { editBoolParams = fn(editBoolParams); };
  const e = { preventDefault: vi.fn() } as any;

  await fn(e, editWriteParams, setTodos, setEditBoolParams, editWriteParams.editId);

  // Vérification
  expect(e.preventDefault).toHaveBeenCalled();
  expect(todos[0][todoKey]).toBe(editWriteParams[key]);
  expect(apiFn).toHaveBeenCalledWith(editWriteParams.editId, editWriteParams);
  expect(editBoolParams[boolKey as keyof typeof editBoolParams]).toBe(true);
};

describe("submit functions", () => {
  it("submitProject", async () => {
    await testSubmit(submitProject, callApiProject, "editProject", "project", "editBoolProject");
  });
  it("submitListe", async () => {
    await testSubmit(submitListe, callApiListe, "editListe", "liste", "editBoolListe");
  });
  it("submitDelay", async () => {
    await testSubmit(submitDelay, callApiDelay, "editDelay", "delay", "editBoolDelay");
  });
  it("submitClient", async () => {
    await testSubmit(submitClient, callApiClient, "editClient", "client", "editBoolClient");
  });
  it("submitMail", async () => {
    await testSubmit(submitMail, callApiMail, "editMail", "email", "editBoolMail");
  });
  it("submitPhone", async () => {
    await testSubmit(submitPhone, callApiPhone, "editPhone", "phone", "editBoolPhone");
  });
});