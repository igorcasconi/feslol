import { createStyles, fade, makeStyles, Theme } from '@material-ui/core'
import styled from 'styled-components'

export const TitleLogo = styled.h1`
  color: #fff;
  font-size: 36px;
  font-weight: bold;
`
export const TextMenu = styled.p`
  color: #fff;
  font-size: 12px;
  text-transform: capitalize;
  font-family: Poppins;
`

export const useStylesInput = makeStyles((theme: Theme) =>
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
