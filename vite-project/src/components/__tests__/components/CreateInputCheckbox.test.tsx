/// <reference types="vitest" />
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import CreateInputCheckbox from '../../CreateInputCheckbox'


describe('CreateInputCheckbox', () => {
  it('rend les inputs', () => {
    render(
      <CreateInputCheckbox
        date=""
        priority=""
        project=""
        liste=""
        delay=""
        client=""
        email=""
        phone=""
        setParamsTodo={() => {}}
        selectedDay={undefined}
        handleCheckBox={() => {}}
        handleSubmit={() => {}}
      />
    )

    const inputNames = ['date','project','liste','delay','client','email','phone']
    inputNames.forEach(client => {
      expect(screen.getByTestId(`input-${client}`)).toBeInTheDocument()
    })
  })
})
