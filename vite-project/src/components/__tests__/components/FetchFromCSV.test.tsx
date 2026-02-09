import { describe, test, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import FetchFromCSV from '../../FetchFromCSV';

describe('CreateInputCheckbox snapshot test', () => {
    test('testing CreateInputCheckbox component', () => {
        const { container } = render(
            <FetchFromCSV />
        );
        expect(container).toMatchSnapshot();
    });
});