import * as Yup from 'yup'

export const teamSchema = Yup.object().shape({
  name: Yup.string().required('Campo necessário'),
  division: Yup.string().required('Campo necessário'),
  link: Yup.string()
})
