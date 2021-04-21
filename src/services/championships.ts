import api from 'providers/api'
import { ListChampionshipSitesProps } from 'shared/listInterfaces'

export const listChampionships = (filters?: string): Promise<ListChampionshipSitesProps> =>
  api.get(`/list-championships?${filters || ''}`)
