import { describe, it, expect, vi } from "vitest";
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
import type { ParamsPriorityTypes, Todo, WriteEditType } from "../../lib/definitions";

// Mock initial todo
const mockTodos: Todo[] = [
  {
    id: "1",
    priority: "option1",
    selectedDay: "mardi",
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

//const callApiPriority = vi.fn();

describe("callChangeDay", () => {

  it('handleChangePriority updates todos and calls API', () => {
      const setTodos = vi.fn();
      const setParamsPriority = vi.fn();
      const e = { target: { value: 'High' } } as any; // simulate the change event

      handleChangePriority(e, 'todo1', setTodos, setParamsPriority);

      expect(setTodos).toHaveBeenCalled(); // Check if setTodos was called
      expect(setParamsPriority).toHaveBeenCalled(); // Check if setParamsPriority was called
      expect(callApiPriority).toHaveBeenCalledWith('todo1', 'High'); // Ensure the API was called with the correct arguments
  });

  it('callChangeDay toggles setDayBool', () => {
      const setTodos = vi.fn();
      const setDayBool = vi.fn();
      const e = { target: { value: '2026-02-12' } } as any; // Simulate day change
      callChangeDay(e, 'todo1', setTodos, setDayBool);

      expect(setDayBool).toHaveBeenCalledWith(expect.any(Function)); // It should toggle the value
  });

  it("should update selectedDay, call API and toggle boolean", () => {
    let todos = [...mockTodos];
    const setTodos = (fn: any) => {
      todos = fn(todos); // exécute la fonction passée
    };

    let dayBool = false;
    const setDayBool = (fn: any) => {
      dayBool = fn(dayBool); // exécute la fonction passée
    };

    const e = { target: { value: "lundi" } } as any;

    callChangeDay(e, "1", setTodos, setDayBool);

    expect(todos[0].selectedDay).toBe("lundi");
    expect(callApiDay).toHaveBeenCalledWith("1", "lundi");
    expect(dayBool).toBe(true); // vérifie que la fonction de toggle a été exécutée
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
});

// Mock WriteEditType
const editWriteParams: WriteEditType = {
  editId: "1",
  editProject: "Project X",
  editListe: "Liste A",
  editDelay: "2 days",
  editClient: "Client Y",
  editMail: "test@mail.com",
  editPhone: "0123456789"
};

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