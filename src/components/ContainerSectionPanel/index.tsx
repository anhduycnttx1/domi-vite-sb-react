import React, { useState } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Container, Flex, Grid, Text } from '@mantine/core'
import ContentBlocksEmpty from '../Empty/ContentBlocksEmpty'
import { SortableElementItem } from '../SortableItem'
import { IFSection, IFElement } from '../../types'
import { calcSpanCol } from '../../helpers'

type ContainerSectionPanelProps = {
  children?: React.ReactNode
  elements?: IFElement[]
}

export function ColEmptyUI({ span }: any) {
  return (
    <Grid.Col
      span={span}
      sx={(theme) => ({
        minHeight: 180,
        backgroundColor: theme.colors.blue[1],
        borderWidth: '1px',
        borderStyle: 'dotted',
        borderColor: theme.colors.blue[7],
        display: 'flex',
      })}
    >
      <Flex align="center" justify="center" w={'100%'}>
        <ContentBlocksEmpty />
      </Flex>
    </Grid.Col>
  )
}

export default function SectionContainerPanelUI({ children }: ContainerSectionPanelProps) {
  return <Grid m={0}>{children}</Grid>
}
