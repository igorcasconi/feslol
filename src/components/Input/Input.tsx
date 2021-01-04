import React from 'react'
import { createStyles, makeStyles, OutlinedInputProps, TextField, Theme, TextFieldProps, fade } from '@material-ui/core'

const useStylesInput = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      border: '1px solid #e2e2e1',
      width: 125,
      padding: 5,
      overflow: 'hidden',
      borderRadius: 8,
      backgroundColor: '#fcfcfb',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:hover': {
        backgroundColor: '#fff'
      },
      '&$focused': {
        backgroundColor: '#fff',
        boxShadow: `${fade('#004E96', 0.25)} 0 0 0 2px`,
        borderColor: '#004E96'
      }
    },
    focused: {}
  })
)

const Input: React.FC<TextFieldProps> = ({ ...props }) => {
  const classes = useStylesInput()
  return (
    <TextField
      InputProps={{ classes, disableUnderline: true } as Partial<OutlinedInputProps>}
      size='small'
      {...props}
    />
  )
}

export default Input
