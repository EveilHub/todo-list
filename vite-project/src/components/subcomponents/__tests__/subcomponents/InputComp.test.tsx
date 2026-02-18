/// <reference types="vitest" />
import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import InputComp from '../../InputComp';

describe('InputComp snapshot test', () => {
    test('testing InputComp component', () => {
        const { container } = render(
            <InputComp 
                type={''} 
                name={''} 
                value={''} 
                placeholder={''} 
            />
        );
        expect(container).toMatchSnapshot();
    });
});