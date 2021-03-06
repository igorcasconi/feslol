import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { EuiButton, EuiFilePicker, EuiFlexItem, EuiFormRow } from '@elastic/eui'
import { useHistory } from 'react-router-dom'
import { useRequest } from 'ahooks'

import { Column, Text, Row, Input } from 'components'
import { createTeam, uploadImage } from 'services/cp'

import { CreateEditForm } from './types'
import { teamSchema } from 'schemas/team'

const filePath = 'teams'

const CreateEditTeam: React.FC = () => {
  const history = useHistory()
  const [file, setFile] = useState<File | null | undefined>(null)

  const { run: newTeamRun, loading: newTeamLoading } = useRequest(createTeam, { manual: true })
  const { run: uploadImageRun, loading: uploadImageLoading } = useRequest(uploadImage, { manual: true })

  const { control, errors, handleSubmit } = useForm<CreateEditForm>({
    defaultValues: { name: '', division: '', link: '' },
    resolver: yupResolver(teamSchema),
    mode: 'onChange'
  })

  const onChangeFile = (files: FileList | null) => {
    setFile(files?.[0])
  }

  const onSubmit = async (values: CreateEditForm) => {
    try {
      const formData = new FormData()

      formData.set('path', filePath)
      if (file) formData.append('file', file)

      const payload = {
        ...values,
        image: file?.name
      }

      await newTeamRun(payload)
      await uploadImageRun(formData)
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
      <Row width='100%' justifyContent='flex-start' mb='20px'>
        <Text fontSize={20} color='#262626'>
          New Team
        </Text>
      </Row>

      <Column width='100%' height='100%' justifyContent='center'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row width='100%' mb='10px'>
            <Controller
              control={control}
              name='name'
              render={({ value, onChange, name }) => (
                <Input
                  label='Nome do time'
                  placeholder='Team LOL'
                  name={name}
                  value={value}
                  onChange={onChange}
                  isInvalid={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
          </Row>

          <Row width='100%' mb='10px'>
            <Controller
              control={control}
              name='division'
              render={({ value, onChange, name }) => (
                <Input
                  label='Divisão'
                  placeholder='T3'
                  name={name}
                  value={value}
                  onChange={onChange}
                  isInvalid={!!errors.division}
                  helperText={errors.division?.message}
                />
              )}
            />
          </Row>

          <Row width='100%' mb='10px'>
            <Controller
              control={control}
              name='link'
              render={({ value, onChange, name }) => (
                <Input
                  label='Link do time (opcional)'
                  placeholder='link, página ou site'
                  name={name}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </Row>

          <Row width='100%' mb='20px'>
            <EuiFormRow label='Logo do time' fullWidth>
              <EuiFilePicker
                fullWidth
                initialPromptText='Selecione a logo deste Time'
                onChange={(files: FileList | null) => {
                  onChangeFile(files)
                }}
                display='default'
              />
            </EuiFormRow>
          </Row>

          <Row width='100%' justifyContent='center' alignItems='center'>
            <Row mr='16px'>
              <EuiButton size='s' onClick={() => history.go(-1)}>
                <Text fontSize={14} color='#262626'>
                  Cancelar
                </Text>
              </EuiButton>
            </Row>

            <EuiFlexItem grow={false}>
              <EuiButton fill size='s' type='submit' isLoading={newTeamLoading || uploadImageLoading}>
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

export default CreateEditTeam
