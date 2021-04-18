import api from 'providers/api'

export const listTeams = (filters?: string) => api.get(`/list-teams?${filters || ''}`)
