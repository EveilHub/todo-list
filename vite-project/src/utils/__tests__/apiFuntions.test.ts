import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
    callApiPriority,
    callApiDay,
    callApiProject,
    callApiListe,
    callApiDelay,
    callApiCalendar,
    callApiClient,
    callApiMail,
    callApiPhone
} from "../apiFunctions";
import type { WriteEditType } from "../../lib/definitions";

vi.stubGlobal("fetch", vi.fn());

beforeEach(() => {
    (fetch as unknown as ReturnType<typeof vi.fn>).mockClear();
});

describe("API call functions", () => {
    it("callApiPriority should call fetch with correct params", async () => {
        (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ ok: true });

        await callApiPriority("123", "high");

        expect(fetch).toHaveBeenCalledOnce();
        expect(fetch).toHaveBeenCalledWith(
            "http://localhost:3001/api/todos/123",
            expect.objectContaining({
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ priority: "high" })
            })
        );
    });

    it("callApiDay should call fetch with correct params", async () => {
        (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ ok: true });

        await callApiDay("123", "monday");

        expect(fetch).toHaveBeenCalledOnce();
        expect(fetch).toHaveBeenCalledWith(
            "http://localhost:3001/api/todos/123",
            expect.objectContaining({
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ selectedDay: "monday" })
            })
        );
    });

    it("callApiProject should call fetch with correct params", async () => {
        (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ ok: true });

        await callApiProject("123", {
            editProject: "Project A",
            editId: "",
            editListe: "",
            editDelay: "",
            editClient: "",
            editMail: "",
            editPhone: ""
        });

        expect(fetch).toHaveBeenCalledOnce();
        expect(fetch).toHaveBeenCalledWith(
            "http://localhost:3001/api/todos/123",
            expect.objectContaining({
                body: JSON.stringify({ project: "Project A" })
            })
        );
    });

    it("callApiListe should call fetch with correct params", async () => {
        (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ ok: true });

        await callApiListe("123", {
            editProject: "Project A",
            editId: "",
            editListe: "Liste A",
            editDelay: "",
            editClient: "",
            editMail: "",
            editPhone: ""
        });

        expect(fetch).toHaveBeenCalledOnce();
        expect(fetch).toHaveBeenCalledWith(
            "http://localhost:3001/api/todos/123",
            expect.objectContaining({
                body: JSON.stringify({ liste: "Liste A" })
            })
        );
    });

    it("callApiDelay should call fetch with correct params", async () => {
        (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ ok: true });

        await callApiDelay("123", {
            editProject: "Project A",
            editId: "",
            editListe: "Liste A",
            editDelay: "05/01/2026 11:00",
            editClient: "",
            editMail: "",
            editPhone: ""
        });

        expect(fetch).toHaveBeenCalledOnce();
        expect(fetch).toHaveBeenCalledWith(
            "http://localhost:3001/api/todos/123",
            expect.objectContaining({
                body: JSON.stringify({ delay: "05/01/2026 11:00" })
            })
        );
    });

    it("callApiCalendar should call fetch with correct params", async () => {
        (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ ok: true });

        await callApiCalendar("123", "05/01/2026 11:00");

        expect(fetch).toHaveBeenCalledOnce();
        expect(fetch).toHaveBeenCalledWith(
            "http://localhost:3001/api/todos/123",
            expect.objectContaining({
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ delay: "05/01/2026 11:00" })
            })
        );
    });

    it("callApiClient should call fetch with correct params", async () => {
        (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ ok: true });

        await callApiClient("123", {
            editProject: "Project A",
            editId: "",
            editListe: "Liste A",
            editDelay: "05/01/2026 11:00",
            editClient: "Leslie",
            editMail: "",
            editPhone: ""
        });

        expect(fetch).toHaveBeenCalledOnce();
        expect(fetch).toHaveBeenCalledWith(
            "http://localhost:3001/api/todos/123",
            expect.objectContaining({
                body: JSON.stringify({ client: "Leslie" })
            })
        );
    });

    it("callApiMail should call fetch with correct params", async () => {
        (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ ok: true });

        await callApiMail("123", {
            editProject: "Project A",
            editId: "",
            editListe: "Liste A",
            editDelay: "05/01/2026 11:00",
            editClient: "Leslie",
            editMail: "jeannedarc@mail.com",
            editPhone: ""
        });

        expect(fetch).toHaveBeenCalledOnce();
        expect(fetch).toHaveBeenCalledWith(
            "http://localhost:3001/api/todos/123",
            expect.objectContaining({
                body: JSON.stringify({ email: "jeannedarc@mail.com" })
            })
        );
    });


    it("callApiPhone should call fetch with correct params", async () => {
        (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ ok: true });

        await callApiPhone("123", {
            editProject: "Project A",
            editId: "",
            editListe: "Liste A",
            editDelay: "05/01/2026 11:00",
            editClient: "Leslie",
            editMail: "jeannedarc@mail.com",
            editPhone: "021 731 28 00"
        });

        expect(fetch).toHaveBeenCalledOnce();
        expect(fetch).toHaveBeenCalledWith(
            "http://localhost:3001/api/todos/123",
            expect.objectContaining({
                body: JSON.stringify({ phone: "021 731 28 00" })
            })
        );
    });
});

describe("callApiWriteEditType", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it("doit appeler console.error si fetch échoue", async () => {
        vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("Network error")));

        const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

        const mockParams: WriteEditType = {
            editId: "",
            editProject: "New Project",
            editListe: "New Liste",
            editDelay: "01/02/2026",
            editClient: "Noa",
            editMail: "mainmail@mail.com",
            editPhone: "076 653 45 44"
        };

        await callApiPriority("1", "high");
        await callApiDay("2", "mardi");
        await callApiProject("3", mockParams);
        await callApiListe("4", mockParams);
        await callApiDelay("5", mockParams);
        await callApiCalendar("6", "01/02/2026");
        await callApiClient("7", mockParams);
        await callApiMail("8", mockParams);
        await callApiPhone("9", mockParams);

        expect(consoleSpy).toHaveBeenCalledTimes(9);
    });
});
