import React, { useState } from 'react'
import {
  DragDropContext,
  Draggable,
  DraggableLocation,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
  DropResult
} from 'react-beautiful-dnd'
import { Controller, useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'

import { Column, Input, Row, Text } from 'components'
import { addChampionship, listTeamsOptions } from 'services/cp'

import { TeamsOptions } from 'shared/listInterfaces'
import { ChampionshipProps, DragAndDropProps } from './types'
import { EuiButton, EuiFlexItem, EuiLoadingSpinner } from '@elastic/eui'

const reorder = (list: TeamsOptions[], startIndex: number, endIndex: number) => {
  const result = list
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const move = (
  sourceList: TeamsOptions[],
  destList: TeamsOptions[],
  source: DraggableLocation,
  destination: DraggableLocation
) => {
  const [removed] = sourceList.splice(source.index, 1)
  destList.splice(destination.index, 0, removed)

  const result: DragAndDropProps = {} as DragAndDropProps

  result.draggable = sourceList
  result.draggable2 = destList

  return result
}

const CreateEditChampionship: React.FC = () => {
  const [teams, setTeams] = useState<TeamsOptions[]>([])
  const [selectedTeamsToChamps, setSelectedTeamsToChamps] = useState<TeamsOptions[]>([])

  const { isLoading: isGettingTeams } = useQuery('teamOptionsGetter', listTeamsOptions, {
    onSuccess: (data: TeamsOptions[]) => setTeams(data)
  })

  const { mutateAsync: mutateAddChampionship, isLoading: isCreatingChampionship } = useMutation(addChampionship)

  const { handleSubmit, errors, control } = useForm<ChampionshipProps>({
    defaultValues: { name: '', division: '', selectedTeams: [], link: '', date: '' },
    mode: 'onChange',
    reValidateMode: 'onChange'
  })

  const onSubmit = async (values: ChampionshipProps) => {
    if (selectedTeamsToChamps.length < 2) return
    try {
      const payload: ChampionshipProps = {
        name: values.name,
        division: values.division,
        link: values.link,
        date: values.date,
        selectedTeams: selectedTeamsToChamps
      }
      await mutateAddChampionship(payload)
      history.go(-1)
    } catch (err) {
      console.log(err)
    }
  }

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result

    if (!destination) {
      return
    }

    if (source.droppableId === destination.droppableId) {
      if (destination.droppableId === 'droppable') {
        const result = reorder(teams, source.index, destination.index)

        setTeams(result)
      } else {
        const result = reorder(selectedTeamsToChamps, source.index, destination.index)

        setSelectedTeamsToChamps(result)
      }
    }

    if (source.droppableId !== destination.droppableId) {
      if (source.droppableId === 'droppable') {
        const result = move(teams, selectedTeamsToChamps, source, destination)

        setTeams(result.draggable)
        setSelectedTeamsToChamps(result.draggable2)
      } else {
        const result = move(selectedTeamsToChamps, teams, source, destination)

        setTeams(result.draggable2)
        setSelectedTeamsToChamps(result.draggable)
      }
    }
  }

  return (
    <Column width='100%' height='100%' paddingX={['10px', '50px', '250px', '350px', '450px']} paddingY='25px'>
      <Row width='100%'>
        <Text fontSize={16} color='#262626'>
          Novo Campeonato
        </Text>
      </Row>
      <Column width='100%' height='100%' justifyContent='center' mt='16px'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row width='100%' mb='10px'>
            <Controller
              control={control}
              name='name'
              render={({ value, onChange, name }) => (
                <Input
                  label='Nome do Campeonato'
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

          <Row width='100%' mb='10px'>
            <Controller
              control={control}
              name='link'
              render={({ value, onChange, name }) => (
                <Input label='Link para o campeonato' name={name} value={value} onChange={onChange} />
              )}
            />
          </Row>

          <Row width='100%' mb='16px'>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId='droppable'>
                {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                  <Column width='50%' mt='20px' height='250px' mr='16px'>
                    <Text fontSize={16} color='#262626'>
                      Times disponíveis
                    </Text>
                    <Column
                      ref={provided.innerRef}
                      width='100%'
                      height='100%'
                      bgColor={snapshot.isDraggingOver ? '#429df3' : '#cdcdcd'}
                      borderRadius='8px'
                      px='5px'
                      py='5px'
                      overflowY='auto'
                    >
                      {isGettingTeams ? (
                        <Column width='100%' height='100%' justifyContent='center' alignItems='center'>
                          <EuiLoadingSpinner size='l' />
                        </Column>
                      ) : (
                        teams &&
                        teams.map((item, index) => (
                          <Draggable key={item?.idTeam} draggableId={item?.idTeam} index={index}>
                            {provided => (
                              <Row
                                width='100%'
                                height='40px'
                                px='10px'
                                py='10px'
                                mt='2px'
                                bgColor='white'
                                alignItems='center'
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                {item?.name}
                              </Row>
                            )}
                          </Draggable>
                        ))
                      )}
                      {provided.placeholder}
                    </Column>
                  </Column>
                )}
              </Droppable>

              <Droppable droppableId='droppable2'>
                {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                  <Column width='50%' mt='20px' height='250px'>
                    <Text fontSize={16} color='#262626'>
                      Times selecionados
                    </Text>
                    <Column
                      ref={provided.innerRef}
                      width='100%'
                      height='100%'
                      bgColor={snapshot.isDraggingOver ? '#5df9c5' : '#cdcdcd'}
                      borderRadius='8px'
                      px='5px'
                      py='5px'
                      overflowY='auto'
                    >
                      {selectedTeamsToChamps.map((item, index) => (
                        <Draggable key={item?.idTeam} draggableId={item?.idTeam} index={index}>
                          {provided => (
                            <Row
                              width='100%'
                              height='40px'
                              px='10px'
                              py='10px'
                              mt='2px'
                              bgColor='white'
                              alignItems='center'
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              {item?.name}
                            </Row>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </Column>
                  </Column>
                )}
              </Droppable>
            </DragDropContext>
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
              <EuiButton fill size='s' type='submit' isLoading={isCreatingChampionship}>
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

export default CreateEditChampionship
