import * as Yup from 'yup'

export const PlayerSchema = Yup.object().shape({
  name: Yup.string().required('Campo necessário'),
  nickname: Yup.string().required('Campo necessário'),
  document: Yup.string().required('Campo necessário'),
  dateOfBirth: Yup.string().required('Campo necessário'),
  city: Yup.string().required('Campo necessário'),
  state: Yup.string().required('Campo necessário'),
  team: Yup.string().required('Campo necessário')
})
