import React from 'react'
import { Center, Container, Flex, Group, Image, Text } from '@mantine/core'
import EmptyLogo from '../../assets/not-search.svg'
interface EmptyDivProps {
  label?: string | boolean
}

function Empty(props: EmptyDivProps) {
  const label: string | boolean = props.label || 'No data'

  return (
    <Container>
      <Group position="center">
        <Image width={150} src={EmptyLogo} alt="empty" />
      </Group>
      <Group position="center" mt={10}>
        {label && (
          <Text c="dimmed" size="xs">
            {label}
          </Text>
        )}
      </Group>
    </Container>
  )
}

export default Empty
