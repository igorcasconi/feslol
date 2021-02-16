import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import jwtDecode from 'jwt-decode'
import { useRequest } from 'ahooks'

import { getAccessControlPanel } from 'services'
import { clearToken, getToken, setToken } from 'utils/auth'
import { LoginProps } from 'shared/loginTypes'

interface UserContextProps {
  user: string | null
  login: (credentials: LoginProps) => Promise<void>
  logout(): void
  loading: boolean
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
  const { run: accessLoginRun, loading } = useRequest(getAccessControlPanel, { manual: true, throwOnError: true })

  const currentToken = useMemo((): string | null | undefined => {
    try {
      const token = getToken()
      return token
    } catch (err) {
      console.log('Error! Token is not Authorization')
    }
  }, [])

  const login = async (credentials: LoginProps) => {
    try {
      const loginResponse = await accessLoginRun(credentials)
      setToken(loginResponse.token)
      setUser(loginResponse.users_email)
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

    if (['/login'].includes(window.location.pathname)) {
      return
    }
  }, [currentToken])

  const logout = () => {
    clearToken()
    setUser(null)
  }

  return <UserContext.Provider value={{ user, login, logout, loading }} {...props} />
}

const useUser = () => useContext(UserContext)

export { UserProvider, useUser }
