export interface ListChampionship {
  id: number
  name: string
  date: string
  hour: string
  link: string
}

export interface ListTeamsProps {
  id: number
  logoImage: string
  name?: string
  results?: string
  division?: string
  lastChampionship?: string
}

export interface ListPlayerProps {
  id: number
  photo: string
  name: string
  team: string
}

export interface NewsDataProps {
  data: { idNews: string; title: string; date: string }[]
  page: number
  totalPages: number
  totalRows: number
}
