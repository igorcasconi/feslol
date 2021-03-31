import { TeamsOptions } from 'shared/listInterfaces'

export interface DragAndDropProps {
  draggable: TeamsOptions[]
  draggable2: TeamsOptions[]
}

export interface ChampionshipProps {
  name: string
  division: string
  selectedTeams: TeamsOptions[]
  link?: string
  date: string
}
