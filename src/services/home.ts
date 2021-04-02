import api from 'providers/api'

import { FeaturedNewsProps, LastChampionshipProps, NewTeamsAddedProps } from 'shared/home'

export const featuredNews = (): Promise<FeaturedNewsProps[]> => api.get('/featured-news')
export const lastChampionships = (): Promise<LastChampionshipProps[]> => api.get('/last-championships')
export const newTeamsAdded = (): Promise<NewTeamsAddedProps[]> => api.get('/new-teams-added')
