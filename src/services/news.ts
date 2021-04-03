import api from 'providers/api'

import { NewsSiteDataProps } from 'shared/listInterfaces'

export const listNews = (filters?: string): Promise<NewsSiteDataProps> => api.get(`/list-news?${filters || ''}`)
