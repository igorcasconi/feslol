import React, { InputHTMLAttributes } from 'react'
import { EuiFieldText, EuiFormRow } from '@elastic/eui'
import styled, { css } from 'styled-components'
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  isInvalid?: boolean
  helperText?: string
}

const Input: React.FC<InputProps> = ({ label, isInvalid, helperText, ...props }) => {
  return (
    <DivInput label={label} fullWidth helpText={helperText} isInvalid={isInvalid}>
      <InputComponent fullWidth isInvalid={isInvalid} {...props} />
    </DivInput>
  )
}

const InputComponent = styled(EuiFieldText)<InputProps>(
  ({ isInvalid }) => css`
    border-radius: 4px;
    padding: 6px;
    font-family: Roboto, sans-serif;
    font-weight: normal;
    font-size: 14px;
    width: 100%;
    border-width: 1px;
    transition: all 0.5s;

    ${isInvalid && 'border: 1.5px solid red'};
  `
)

const DivInput = styled(EuiFormRow)<InputProps>(
  ({ isInvalid }) =>
    css`
      transition: all 0.5s;
      width: 100%;
      ${isInvalid && 'color:red'};

      & .euiFormLabel {
        font-size: 12px;
        font-weight: normal;
      }
    `
)

export default Input
