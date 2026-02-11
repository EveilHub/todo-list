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
import type { WriteEditType } from "../../lib/definitions";

// Mock initial todo
const initialTodos = [
  {
    id: "1",
    priority: "option1",
    selectedDay: "mardi",
    project: "",
    liste: "",
    delay: "",
    client: "",
    email: "",
    phone: ""
  }
];

describe("handleChangePriority", () => {
  it("should update todos, call API and hide priority", () => {
    let todos = [...initialTodos];
    const setTodos = (fn: any) => { todos = fn(todos); };
    const setParamsPriority = vi.fn();
    const e = { target: { value: "option2" } } as any;

    handleChangePriority(e, "1", setTodos, setParamsPriority);

    expect(todos[0].priority).toBe("option2");
    expect(callApiPriority).toHaveBeenCalledWith("1", "option2");
    expect(setParamsPriority).toHaveBeenCalledWith(expect.any(Function));
  });
});

describe("callChangeDay", () => {
  it("should update day, call API and toggle boolean", () => {
    let todos = [...initialTodos];
    const setTodos = (fn: any) => { todos = fn(todos); };
    let dayBool = false;
    const setDayBool = (fn: any) => { dayBool = fn(dayBool); };
    const e = { target: { value: "lundi" } } as any;

    callChangeDay(e, "1", setTodos, setDayBool);

    expect(todos[0].selectedDay).toBe("lundi");
    expect(callApiDay).toHaveBeenCalledWith("1", "lundi");
    expect(dayBool).toBe(true);
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
  todoKey: keyof typeof initialTodos[0],
  boolKey: string
) => {
  let todos = [...initialTodos];
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

