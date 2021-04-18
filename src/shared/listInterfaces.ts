export interface ListChampionship {
  id: number
  name: string
  date: string
  hour: string
  link: string
}

export interface ListTeamsProps {
  idTeam: number
  logoImage: string
  teamName?: string
  defeats?: number
  victorys?: number
  division?: string
  lastChampionship?: string
}

export interface ListPlayerProps {
  idPlayer: string
  image: string
  nickname: string
  teamName: string
}

interface PaginationProps {
  page: number
  totalPages: number
  totalRows: number
}

export interface NewsDataProps extends PaginationProps {
  data: { idNews: string; title: string; date: string }[]
}

export interface NewsSiteDataProps extends PaginationProps {
  data: { idNews: string; title: string; date: string; text: string }[]
}

export interface ListTeamsDataProps extends PaginationProps {
  data: { idTeam: string; name: string; division: string }[]
}

export interface ListPlayerSiteDataProps extends PaginationProps {
  data: ListPlayerProps[]
}

export interface TeamsOptions {
  idTeam: string
  name: string
}

export interface ListChampionshipCPProps extends PaginationProps {
  data: { idChampionship: string; name: string; division: string; date: string }[]
}

export interface ListPlayersCPProps extends PaginationProps {
  data: { idPlayer: string; nickname: string; playerName: string; teamName: string }[]
}
