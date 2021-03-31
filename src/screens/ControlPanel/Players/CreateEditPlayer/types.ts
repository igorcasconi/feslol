export interface CreateEditPlayerForm {
  name: string
  nickname: string
  document: string
  dateOfBirth: string
  city: string
  state: string
  image?: string
  team: string
}

export interface OptionsSelect {
  value: string | number
  inputDisplay: string
}
