import * as Yup from 'yup'

export const newsSchema = Yup.object().shape({
  title: Yup.string().required('Campo necessário'),
  text: Yup.string().required('Campo necessário'),
  date: Yup.date().required('Campo necessário')
})
