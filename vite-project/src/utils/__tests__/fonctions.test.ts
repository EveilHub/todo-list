import { describe, it, expect, vi } from "vitest";
import {
    sortTodosByPriorityAndDelay,
    formatPhoneNumber,
    changeColor
} from "../fonctions";

describe("Utils", () => {

    // -------------------------
    // Tests pour sortTodosByPriorityAndDelay
    // -------------------------
    it("sortTodosByPriorityAndDelay should sort correctly by day, priority, and delay", () => {
        const todos = [
            { id: 1, selectedDay: "mardi", priority: "option2", delay: "20/02/2025 10:00" },
            { id: 2, selectedDay: "lundi", priority: "option3", delay: "19/02/2025 09:00" },
            { id: 3, selectedDay: "lundi", priority: "option1", delay: "19/02/2025 08:00" },
        ];

        const result = sortTodosByPriorityAndDelay(todos as any);

        expect(result.map(t => t.id)).toEqual([3, 2, 1]);
    });

    it("handles todos with undefined selectedDay", () => {
        const todos = [
            { id: 1, selectedDay: undefined, priority: "option2", delay: "20/02/2025 10:00" },
            { id: 2, selectedDay: "lundi", priority: "option1", delay: "19/02/2025 08:00" }
        ];

        const result = sortTodosByPriorityAndDelay(todos as any);
        expect(result.map(t => t.id)).toEqual([1, 2]);
    });

    it("handles todos with undefined priority", () => {
        const todos = [
            { id: 1, selectedDay: "lundi", priority: undefined, delay: "20/02/2025 10:00" },
            { id: 2, selectedDay: "lundi", priority: "option1", delay: "19/02/2025 08:00" }
        ];

        const result = sortTodosByPriorityAndDelay(todos as any);
        expect(result.map(t => t.id)).toEqual([1, 2]);
    });

    it("handles todos with invalid delay format", () => {
        const todos = [
            { id: 1, selectedDay: "lundi", priority: "option1", delay: "invalid date" },
            { id: 2, selectedDay: "lundi", priority: "option1", delay: "19/02/2025 08:00" }
        ];

        const result = sortTodosByPriorityAndDelay(todos as any);
        expect(result.map(t => t.id)).toEqual([1, 2]);
    });

    it("keeps order stable when todos are identical", () => {
        const todos = [
            { id: 1, selectedDay: "lundi", priority: "option1", delay: "19/02/2025 08:00" },
            { id: 2, selectedDay: "lundi", priority: "option1", delay: "19/02/2025 08:00" }
        ];

        const result = sortTodosByPriorityAndDelay(todos as any);
        expect(result.map(t => t.id)).toEqual([1, 2]);
    });

    // -------------------------
    // Tests pour formatPhoneNumber
    // -------------------------
    it("formatPhoneNumber should format phone numbers", () => {
        expect(formatPhoneNumber("0123456789")).toBe("012 345 67 89");
        expect(formatPhoneNumber("01-23 45 67 89")).toBe("012 345 67 89");
    });

    it("formats incomplete or extra-long numbers correctly", () => {
        expect(formatPhoneNumber("0123456")).toBe("012 345 6");
        expect(formatPhoneNumber("01234567890123")).toBe("012 345 67 89");
        expect(formatPhoneNumber("01a2b3c4d5e6f7g8h9i0")).toBe("012 345 67 89");
        expect(formatPhoneNumber("")).toBe("");
    });

    // -------------------------
    // Tests pour changeColor
    // -------------------------
    it("changeColor should set correct colors", () => {
        const setParamsPriority = vi.fn();

        changeColor(setParamsPriority, "option1");
        const callback1 = setParamsPriority.mock.calls[0][0];
        expect(callback1({ bgColor: "" }).bgColor).toBe("#115c9a");

        changeColor(setParamsPriority, "unknown");
        const callback2 = setParamsPriority.mock.calls[1][0];
        expect(callback2({ bgColor: "" }).bgColor).toBe("#00002f");
    });

    it("sets colors correctly for all options and preserves previous state", () => {
        const setParamsPriority = vi.fn();

        changeColor(setParamsPriority, "option2");
        const callback2 = setParamsPriority.mock.calls[0][0];
        expect(callback2({ bgColor: "", other: 123 })).toEqual({ bgColor: "#0b3c65", other: 123 });

        changeColor(setParamsPriority, "option3");
        const callback3 = setParamsPriority.mock.calls[1][0];
        expect(callback3({ bgColor: "" })).toEqual({ bgColor: "#00002f" });
    });
});

