import api from 'providers/api'
import { NewsForm } from 'screens/ControlPanel/News/CreateEditNews/types'
import { CreateEditPlayerForm, TeamsOptions } from 'screens/ControlPanel/Players/CreateEditPlayer/types'
import { CreateEditForm } from 'screens/ControlPanel/Teams/CreateEditTeam/types'

export const createTeam = (payload: CreateEditForm) => api.post('/new-team', payload)
export const uploadImage = (image: FormData) =>
  api.post('/upload-images', image, { headers: { 'Content-Type': 'multipart/form-data' } })
export const createNews = (payload: NewsForm) => api.post('/add-news', payload)
export const listTeamsOptions = (): Promise<TeamsOptions[]> => api.get('/list-teams-options')
export const createPlayer = (payload: CreateEditPlayerForm) => api.post('/add-player', payload)
