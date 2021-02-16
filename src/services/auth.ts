import api from 'providers/api'
import { LoginProps } from 'shared/loginTypes'

export const getAccessControlPanel = (payload: LoginProps) => api.post('/login', { data: payload })
