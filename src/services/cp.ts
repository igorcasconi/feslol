import api from 'providers/api'
import { NewsForm } from 'screens/ControlPanel/News/CreateEditNews/types'
import { CreateEditForm } from 'screens/ControlPanel/Teams/CreateEditTeam/types'

export const createTeam = (payload: CreateEditForm) => api.post('/new-team', payload)
export const uploadImage = (image: FormData) =>
  api.post('/upload-images', image, { headers: { 'Content-Type': 'multipart/form-data' } })
export const createNews = (payload: NewsForm) => api.post('/add-news', payload)
