import api from 'providers/api'
import { NewsForm } from 'screens/ControlPanel/News/CreateEditNews/types'
import { CreateEditPlayerForm, TeamsOptions } from 'screens/ControlPanel/Players/CreateEditPlayer/types'
import { CreateEditForm } from 'screens/ControlPanel/Teams/CreateEditTeam/types'
import { ListTeamsDataProps, NewsDataProps } from 'shared/listInterfaces'

export const createTeam = (payload: CreateEditForm) => api.post('/new-team', payload)
export const uploadImage = (image: FormData) =>
  api.post('/upload-images', image, { headers: { 'Content-Type': 'multipart/form-data' } })
export const createNews = (payload: NewsForm) => api.post('/add-news', payload)
export const listTeamsOptions = (): Promise<TeamsOptions[]> => api.get('/list-teams-options')
export const createPlayer = (payload: CreateEditPlayerForm) => api.post('/add-player', payload)
export const listNews = (filters?: string): Promise<NewsDataProps> => api.get(`/list-news-cp?${filters || ''}`)
export const deleteNews = (id: string) => api.delete(`/delete-news-cp?id=${id}`)
export const listTeams = (filters?: string): Promise<ListTeamsDataProps> => api.get(`/list-teams-cp?${filters || ''}`)
export const deleteTeam = (id: string) => api.delete(`/delete-team-cp?id=${id}`)
