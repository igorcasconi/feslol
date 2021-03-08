import React, { useState } from 'react'
import { EuiButton, EuiFilePicker, EuiFlexItem, EuiSuperSelect } from '@elastic/eui'
import { Controller, useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from 'react-query'

import { Column, FormRow, Input, Row, Text } from 'components'
import { PlayerSchema } from 'schemas/player'
import { createPlayer, listTeamsOptions, uploadImage } from 'services/cp'

import { CreateEditPlayerForm, OptionsSelect, TeamsOptions } from './types'

const filePath = 'players'

const CreateEditPlayer: React.FC = () => {
  const history = useHistory()
  const [file, setFile] = useState<File | null | undefined>(null)

  const { data: optionsTeams } = useQuery('teamsGetter', listTeamsOptions, {
    select: (data: TeamsOptions[]): OptionsSelect[] =>
      data?.map((item: TeamsOptions) => ({ value: item.idTeam, inputDisplay: item.name }))
  })

  const { isLoading: isSubmittingForm, mutateAsync: submitForm } = useMutation(createPlayer)
  const { isLoading: isUploadingImage, mutateAsync: mutateUploadImage } = useMutation(uploadImage)

  const { control, handleSubmit, errors } = useForm<CreateEditPlayerForm>({
    defaultValues: { name: '', nickname: '', document: '', dateOfBirth: '', team: '' },
    resolver: yupResolver(PlayerSchema),
    mode: 'onChange'
  })

  const onChangeFile = (files: FileList | null) => {
    setFile(files?.[0])
  }

  const onSubmit = async (values: CreateEditPlayerForm) => {
    try {
      const formData = new FormData()

      formData.set('path', filePath)
      if (file) formData.append('file', file)

      const payload = {
        ...values,
        image: file?.name
      }

      await submitForm(payload)
      await mutateUploadImage(formData)
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
          Novo Player
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
                  label='Nome do Jogador'
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
              name='nickname'
              render={({ value, onChange, name }) => (
                <Input
                  label='Apelido no LOL'
                  name={name}
                  value={value}
                  onChange={onChange}
                  isInvalid={!!errors.nickname}
                  helperText={errors.nickname?.message}
                />
              )}
            />
          </Row>

          <Row width='100%' mb='10px'>
            <Controller
              control={control}
              name='document'
              render={({ value, onChange, name }) => (
                <Input
                  label='Documento de identificação'
                  name={name}
                  value={value}
                  onChange={onChange}
                  isInvalid={!!errors.document}
                  helperText={errors.document?.message}
                />
              )}
            />
          </Row>

          <Row width='100%' mb='20px'>
            <Controller
              control={control}
              name='dateOfBirth'
              render={({ value, onChange, name }) => (
                <Input
                  label='Data de nascimento'
                  type='date'
                  name={name}
                  value={value}
                  onChange={onChange}
                  isInvalid={!!errors.dateOfBirth}
                  helperText={errors.dateOfBirth?.message}
                />
              )}
            />
          </Row>

          <Row width='100%' mb='10px'>
            <Controller
              control={control}
              name='city'
              render={({ value, onChange, name }) => (
                <Input
                  label='Cidade'
                  name={name}
                  value={value}
                  onChange={onChange}
                  isInvalid={!!errors.city}
                  helperText={errors.city?.message}
                />
              )}
            />
          </Row>

          <Row width='100%' mb='10px'>
            <Controller
              control={control}
              name='state'
              render={({ value, onChange, name }) => (
                <Input
                  label='Estado'
                  name={name}
                  value={value}
                  onChange={onChange}
                  isInvalid={!!errors.state}
                  helperText={errors.state?.message}
                />
              )}
            />
          </Row>

          <Row width='100%' mb='10px'>
            <FormRow label='Time' fullWidth helpText={errors.team?.message}>
              <Controller
                control={control}
                name='team'
                render={({ value, onChange, name }) => (
                  <EuiSuperSelect
                    options={optionsTeams ? optionsTeams : []}
                    name={name}
                    valueOfSelected={value}
                    onChange={onChange}
                    compressed={true}
                    isInvalid={!!errors.team?.message}
                    fullWidth
                  />
                )}
              />
            </FormRow>
          </Row>

          <Row width='100%' mb='20px'>
            <FormRow label='Foto do Jogador' fullWidth>
              <EuiFilePicker
                fullWidth
                initialPromptText='Selecione a foto deste jogador'
                onChange={(files: FileList | null) => {
                  onChangeFile(files)
                }}
                display='default'
              />
            </FormRow>
          </Row>

          <Row width='100%' justifyContent='center' alignItems='center' mb='50px'>
            <Row mr='16px'>
              <EuiButton size='s' onClick={() => history.go(-1)}>
                <Text fontSize={14} color='#262626'>
                  Cancelar
                </Text>
              </EuiButton>
            </Row>

            <EuiFlexItem grow={false}>
              <EuiButton fill size='s' type='submit' isLoading={isSubmittingForm || isUploadingImage}>
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

export default CreateEditPlayer
