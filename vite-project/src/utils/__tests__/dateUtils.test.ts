import { describe, it, expect } from "vitest";
import { parseDate, getISOWeekNumber, getWeekDays, isSameDay } from "../dateUtils";

describe("Date Utils", () => {
    it("parseDate should parse a string into a Date", () => {
        const result = parseDate("20/02/2025 10:00");
        expect(result.getFullYear()).toBe(2025);
        expect(result.getMonth()).toBe(1);
        expect(result.getDate()).toBe(20);
    });

    it("getISOWeekNumber should return correct ISO week number", () => {
        const date = new Date(2025, 0, 6);
        expect(getISOWeekNumber(date)).toBe(2);
    });

    it("getWeekDays should return Monday to Friday", () => {
        const date = new Date(2025, 0, 8);
        const weekDays = getWeekDays(date);

        expect(weekDays).toHaveLength(5);
        expect(weekDays[0].getDay()).toBe(1);
        expect(weekDays[4].getDay()).toBe(5);
    });

    it("isSameDay should return true for same day", () => {
        const d1 = new Date(2025, 0, 1);
        const d2 = new Date(2025, 0, 1, 23, 59);
        expect(isSameDay(d1, d2)).toBe(true);
    });

    it("isSameDay should return false for different days", () => {
        const d1 = new Date(2025, 0, 1);
        const d2 = new Date(2025, 0, 2);
        expect(isSameDay(d1, d2)).toBe(false);
    });
});
