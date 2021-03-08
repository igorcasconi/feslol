import React from 'react'
import { EuiFormRow, EuiFormRowProps } from '@elastic/eui'
import styled from 'styled-components'

const FormRow: React.FC<EuiFormRowProps> = ({ label, fullWidth = false, children }) => (
  <FormRowComponent label={label} fullWidth={fullWidth}>
    {children}
  </FormRowComponent>
)

const FormRowComponent = styled(EuiFormRow)`
  width: 100%;
  & .euiFormLabel {
    font-size: 12px;
    font-weight: normal;
  }
`

export default FormRow
