import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { EuiButton, EuiFlexItem } from '@elastic/eui'
import { useHistory } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { Editor } from '@tinymce/tinymce-react'

import { Column, Text, Row, Input } from 'components'
import { createNews } from 'services/cp'

import { NewsForm } from './types'
import { newsSchema } from 'schemas/news'

const CreateEditNews: React.FC = () => {
  const history = useHistory()

  const { run: addNewsRun, loading: addNewLoading } = useRequest(createNews, { manual: true })

  const { control, errors, handleSubmit } = useForm<NewsForm>({
    defaultValues: { title: '', text: '', date: '' },
    resolver: yupResolver(newsSchema),
    mode: 'onChange'
  })

  const onSubmit = async (values: NewsForm) => {
    try {
      const payload = {
        ...values
      }

      await addNewsRun(payload)
      history.go(-1)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Column
      width='100%'
      height='100%'
      paddingX={['10px', '50px', '250px', '350px', '450px']}
      paddingY='25px'
      alignItems='center'
    >
      <Row width='100%' justifyContent='flex-start' mb='30px'>
        <Text fontSize={20} color='#262626'>
          Nova Notícia
        </Text>
      </Row>

      <Column width='100%' height='100%' justifyContent='center'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row width='100%' mb='10px'>
            <Controller
              control={control}
              name='title'
              render={({ value, onChange, name }) => (
                <Input
                  label='Title'
                  placeholder='Título da notícia'
                  name={name}
                  value={value}
                  onChange={onChange}
                  isInvalid={!!errors.title}
                  helperText={errors.title?.message}
                />
              )}
            />
          </Row>

          <Row width='100%' mb='20px'>
            <Controller
              control={control}
              name='date'
              render={({ value, onChange, name }) => (
                <Input
                  label='Data'
                  type='date'
                  name={name}
                  value={value}
                  onChange={onChange}
                  isInvalid={!!errors.date}
                  helperText={errors.date?.message}
                />
              )}
            />
          </Row>

          <Column width='100%' mb='20px'>
            <Row width='100%' mb='8px'>
              <Text fontSize={13} color='#262626'>
                Texto da notícia
              </Text>
            </Row>
            <Controller
              control={control}
              name='text'
              render={({ value, onChange }) => (
                <Editor
                  value={value}
                  onEditorChange={onChange}
                  apiKey='pcrgs7itvxha8yxbe1at0tx380xge6pbk3a20vxybwt362xd'
                  init={{
                    height: 180,
                    menubar: false,
                    plugins: [
                      'advlist autolink lists link image charmap print preview anchor',
                      'searchreplace visualblocks code fullscreen',
                      'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar:
                      'undo redo | formatselect | bold italic backcolor | \
                  alignleft aligncenter alignright alignjustify | \
                  bullist numlist outdent indent | removeformat | help'
                  }}
                />
              )}
            />
          </Column>

          <Row width='100%' justifyContent='center' alignItems='center'>
            <Row mr='16px'>
              <EuiButton size='s' onClick={() => history.go(-1)}>
                <Text fontSize={14} color='#262626'>
                  Cancelar
                </Text>
              </EuiButton>
            </Row>

            <EuiFlexItem grow={false}>
              <EuiButton fill size='s' type='submit' isLoading={addNewLoading}>
                <Text fontSize={14} color='white'>
                  Enviar
                </Text>
              </EuiButton>
            </EuiFlexItem>
          </Row>
        </form>
      </Column>
    </Column>
  )
}

export default CreateEditNews
