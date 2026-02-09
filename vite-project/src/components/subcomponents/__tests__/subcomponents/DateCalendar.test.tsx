/// <reference types="vitest" />
import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import DateCalendar from '../../DateCalendar';

describe('DateCalendar snapshot test', () => {
    test('testing DateCalendar component', () => {
        const testDate = new Date("2026-02-09T00:00:00");
        const { container } = render(
            <DateCalendar date={testDate} />
        );
        expect(container).toMatchSnapshot();
    });
});

describe("DateCalendar", () => {
    test("affiche correctement le jour de la semaine en français en majuscules", () => {
        const testDate = new Date("2026-02-09T00:00:00"); 
        render(<DateCalendar date={testDate} />);
        const expectedDay = testDate.toLocaleDateString("fr-FR", { weekday: "long" }).toUpperCase();
        expect(screen.getByText(expectedDay)).toBeDefined();
    });
});