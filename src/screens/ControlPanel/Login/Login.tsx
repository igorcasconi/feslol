import React, { useEffect } from 'react'
import { Button, TextField, CircularProgress } from '@material-ui/core'
import { Controller, useForm } from 'react-hook-form'
import styled from 'styled-components'
import { yupResolver } from '@hookform/resolvers/yup'
import { useLocation, useHistory } from 'react-router-dom'

import { Column, Text } from 'components'
import { LoginSchema } from 'schemas'
import { useUser } from 'contexts/user'

import { LoginProps } from 'shared/loginTypes'

const Login: React.FC = () => {
  const { login, loading, currentToken } = useUser()
  const route = useLocation()
  const history = useHistory()

  const { control, handleSubmit } = useForm<LoginProps>({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(LoginSchema),
    mode: 'onChange',
    reValidateMode: 'onChange'
  })

  const onSubmit = async (values: LoginProps) => {
    await login(values)
  }

  useEffect(() => {
    if (currentToken && route.pathname.includes('/login')) return history.push('control-panel/dashboard')
  }, [])

  return (
    <Column height='100%' width='100%' paddingX={['10px', '50px', '250px', '450px', '550px']} justifyContent='center'>
      <BoxLogin
        width='100%'
        border='1px solid #cdcdcd'
        borderRadius='8px'
        paddingX='10px'
        paddingY='10px'
        boxShadow='10px 5px 5px #cdcdcd'
      >
        <Text fontSize={20} color='white' textAlign='center'>
          Login OSLOL
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Column width='100%' mb='16px' mt='16px'>
            <Controller
              name='email'
              control={control}
              render={({ value, onChange, name }) => (
                <InputLogin
                  label='Username'
                  name={name}
                  variant='outlined'
                  value={value}
                  size='small'
                  onChange={onChange}
                />
              )}
            />
          </Column>
          <Column width='100%' mb='16px'>
            <Controller
              name='password'
              control={control}
              render={({ value, onChange, name }) => (
                <InputLogin
                  label='Senha'
                  variant='outlined'
                  name={name}
                  size='small'
                  value={value}
                  onChange={onChange}
                  type='password'
                />
              )}
            />
          </Column>
          <Button type='submit' style={{ width: '100%' }} disabled={loading}>
            <Column
              width='100%'
              bgcolor='#01c044'
              paddingY='10px'
              borderRadius='8px'
              justifyContent='center'
              alignItems='center'
            >
              {loading ? (
                <CircularProgress size={18} />
              ) : (
                <Text fontSize={12} color='white'>
                  Acessar
                </Text>
              )}
            </Column>
          </Button>
        </form>
      </BoxLogin>
    </Column>
  )
}

const InputLogin = styled(TextField)`
  & .MuiInputBase-root {
    font-size: 12px;
    color: white;
  }

  & .MuiInputLabel-outlined {
    font-size: 12px;
    color: white;
  }

  & .MuiOutlinedInput-notchedOutline + &:hover {
    border-color: white;
  }
`

const BoxLogin = styled(Column)`
  background: rgb(205, 205, 205);
  background: linear-gradient(118deg, rgba(205, 205, 205, 1) 4%, rgba(0, 78, 150, 1) 55%, rgba(38, 38, 38, 1) 96%);
`

export default Login
