import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { ActionIcon, Container, createStyles, Group } from '@mantine/core'
import { IconArrowsMove, IconCopy, IconTrash } from '@tabler/icons'
import { UniqueIdentifier } from '@dnd-kit/core'

type SortableElementItemProps = {
  id: UniqueIdentifier
  idActive: UniqueIdentifier | null
  type: string
  children?: React.ReactNode
  onCopyBtn?: () => void
  onDeleteBtn?: () => void
  onActive: React.Dispatch<React.SetStateAction<UniqueIdentifier | null>>
}

export default function SortableElementItem(props: SortableElementItemProps) {
  const { id, children, type, onDeleteBtn, onCopyBtn, idActive, onActive } = props
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  })

  const { classes, cx } = useStyles()

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? '100' : '20',
    opacity: isDragging ? 0.3 : 1,
  }

  return (
    <div className={classes.parent} ref={setNodeRef} style={style}>
      {/* Content */}
      <Container fluid>{children}</Container>
      {/* Wrapperr hover */}
      <Group
        className={cx(classes.wrapper, {
          [classes.activeWrap]: idActive && idActive === id,
        })}
        onClick={() => onActive(id)}
      >
        {/* Button Drag */}
        <ActionIcon
          radius="xs"
          className={cx(classes.handleDrag, {
            [classes.active]: idActive && idActive === id,
          })}
          {...listeners}
          {...attributes}
          variant="filled"
          color="blue"
        >
          <IconArrowsMove size={16} />
        </ActionIcon>
        <Group
          spacing="sm"
          className={cx(classes.handleGroupBtn, {
            [classes.active]: idActive && idActive === id,
          })}
        >
          {/* Button Delete */}
          <ActionIcon radius="xs" variant="filled" color="blue" onClick={onDeleteBtn}>
            <IconTrash size={16} />
          </ActionIcon>
          {/* Button Copy */}
          <ActionIcon radius="xs" variant="filled" color="blue" onClick={onCopyBtn}>
            <IconCopy size={16} />
          </ActionIcon>
        </Group>
        <div
          className={cx(classes.label, {
            [classes.active]: idActive && idActive === id,
          })}
        >
          {type[0] + type.slice(1).toLowerCase()}
        </div>
      </Group>
    </div>
  )
}

const useStyles = createStyles((theme, _params, getRef) => ({
  parent: {
    position: 'relative',
    width: '100%',
  },
  wrapper: {
    position: 'absolute',
    width: '100%',
    top: 0,
    height: '100%',

    borderWidth: '2px',
    borderColor: 'transparent',
    borderStyle: 'solid',

    '&:hover': {
      borderColor: theme.colors.blue[5],
    },
    [`&:hover .${getRef('handle-drag-e')} `]: {
      display: 'flex',
    },
    [`&:hover .${getRef('handle-group-e')} `]: {
      display: 'flex',
    },
    [`&:hover .${getRef('label-e')}`]: {
      display: 'flex',
    },
  },
  handleDrag: {
    ref: getRef('handle-drag-e'),
    display: 'none',
    position: 'absolute',
    left: -16,
    top: '50%',
    bottom: '50%',
    transform: 'translate(-50%,-50%)',
  },
  handleGroupBtn: {
    ref: getRef('handle-group-e'),
    display: 'none',
    position: 'absolute',
    right: 0,
    top: -28,
  },
  label: {
    ref: getRef('label-e'),
    width: 'fit-content',
    display: 'none',
    padding: '0.5px 3px',
    fontSize: theme.fontSizes.sm,
    color: theme.colors.gray[1],
    background: theme.colors.blue[5],
    position: 'absolute',
    right: 10,
    bottom: -24,
    zIndex: 90,
  },
  active: {
    display: 'flex',
  },
  activeWrap: {
    borderColor: theme.colors.blue[5],
  },
}))
