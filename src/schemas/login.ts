import * as Yup from 'yup'

export const LoginSchema = Yup.object().shape({
  email: Yup.string().required('Campo necessário'),
  password: Yup.string().required('Campo necessário')
})
