import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useFetchDate } from './useFetchDate';

vi.useFakeTimers(); // On mock les timers pour contrôler setInterval

describe('useFetchDate hook', () => {
    it('returns today date in correct format', () => {
        const mockSetTime = vi.fn();
        
        const { result } = renderHook(() => useFetchDate({ setTime: mockSetTime }));

        // La date initiale renvoyée
        const today = new Date();
        const pad = (n: number) => String(n).padStart(2, '0');
        const expected = `${pad(today.getDate())}/${pad(today.getMonth()+1)}/${today.getFullYear()} ${pad(today.getHours())}:${pad(today.getMinutes())}`;

        expect(result.current).toBe(expected);
    });

    it('calls setTime immediately and on interval', () => {
        const mockSetTime = vi.fn();

        renderHook(() => useFetchDate({ setTime: mockSetTime }));

        // setTime doit être appelé immédiatement
        expect(mockSetTime).toHaveBeenCalledTimes(1);

        // Avancer le timer de 1 minute
        act(() => {
        vi.advanceTimersByTime(60000);
        });

        // setTime doit être appelé à nouveau
        expect(mockSetTime).toHaveBeenCalledTimes(2);

        // Avancer encore 2 minutes
        act(() => {
        vi.advanceTimersByTime(120000);
        });
        expect(mockSetTime).toHaveBeenCalledTimes(4);
    });

    it('clears interval on unmount', () => {
        const mockSetTime = vi.fn();
        const { unmount } = renderHook(() => useFetchDate({ setTime: mockSetTime }));

        const spyClearInterval = vi.spyOn(globalThis, 'clearInterval');

        unmount();

        expect(spyClearInterval).toHaveBeenCalled();
        spyClearInterval.mockRestore();
    });
});
