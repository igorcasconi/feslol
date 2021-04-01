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

interface PaginationProps {
  page: number
  totalPages: number
  totalRows: number
}

export interface NewsDataProps extends PaginationProps {
  data: { idNews: string; title: string; date: string }[]
}

export interface ListTeamsDataProps extends PaginationProps {
  data: { idTeam: string; name: string; division: string }[]
}

export interface TeamsOptions {
  idTeam: string
  name: string
}

export interface ListChampionshipCPProps extends PaginationProps {
  data: { idChampionship: string; name: string; division: string; date: string }[]
}
