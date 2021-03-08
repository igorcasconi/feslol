import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import jwtDecode from 'jwt-decode'
import { useMutation } from 'react-query'

import { getAccessControlPanel } from 'services'
import { clearToken, getToken, setToken } from 'utils/auth'
import { LoginProps } from 'shared/loginTypes'

interface UserContextProps {
  user: string | null
  login: (credentials: LoginProps) => Promise<void>
  logout(): void
  loading: boolean
  currentToken: string | null | undefined
}

interface TokenProps {
  exp: number
  iat: number
  nbf: number
  role: string
}

const UserContext = createContext<UserContextProps>({} as UserContextProps)

const UserProvider: React.FC = props => {
  const [user, setUser] = useState<string | null>(null)
  const { mutateAsync: accessLoginRun, isLoading: loading } = useMutation(getAccessControlPanel)

  const currentToken = useMemo((): string | null | undefined => {
    try {
      const token = getToken()
      return token
    } catch (err) {
      console.log('Error! Token is not Authorized')
    }
  }, [])

  const login = async (credentials: LoginProps) => {
    try {
      const loginResponse = await accessLoginRun(credentials)
      setToken(loginResponse.token)
      setUser(loginResponse.users_email)
      window.location.href = '/control-panel/dashboard'
    } catch (err) {
      console.log('error', err)
    }
  }

  useEffect(() => {
    if (currentToken) {
      const fetchUser = async () => {
        try {
          const jwt: TokenProps = jwtDecode(currentToken)
          setUser(jwt.role)
        } catch (err) {
          console.log('error', err)
        }
      }
      fetchUser()
    }
  }, [currentToken])

  const logout = () => {
    clearToken()
    setUser(null)
  }

  return <UserContext.Provider value={{ user, login, logout, loading, currentToken }} {...props} />
}

const useUser = () => useContext(UserContext)

export { UserProvider, useUser }
