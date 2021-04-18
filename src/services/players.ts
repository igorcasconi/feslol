import api from 'providers/api'
import { ListPlayerSiteDataProps } from 'shared/listInterfaces'

export const listPlayers = (filters?: string): Promise<ListPlayerSiteDataProps> =>
  api.get(`/list-players?${filters || ''}`)
