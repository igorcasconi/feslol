import api from 'providers/api'
import { CreateEditForm } from 'screens/ControlPanel/Teams/CreateEditTeam/types'

export const createTeam = (payload: CreateEditForm) => api.post('/new-team', payload)
export const uploadImage = (image: FormData) =>
  api.post('/upload-images', image, { headers: { 'Content-Type': 'multipart/form-data' } })
