import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DragEndEvent,
  DragStartEvent,
  useDroppable,
  closestCorners,
  DragOverEvent,
  UniqueIdentifier,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  rectSortingStrategy,
} from '@dnd-kit/sortable'
import { Button, Container, Flex, Grid, Group, Stack, Text } from '@mantine/core'
import { IconPlus } from '@tabler/icons'
import { useState } from 'react'
import { nanoid } from 'nanoid'

import Empty from '../../../components/Empty'
import { SortableContainerItem, SortableElementItem } from '../../../components/SortableItem'
import SectionContainerPanelUI, { ColEmptyUI } from '../../../components/ContainerSectionPanel'
import { IFSection, IFElement } from '../../../types'
import { calcSpanCol } from '../../../helpers'

type PageEditContainerProps = {}
const mockdata = [
  {
    id: 'tesst',
    sectionId: 'uebEvQDJTs',
    col: 0,
    label: 'TEXT',
    payload: {
      content: 'anbc',
    },
  },
  {
    id: 'tesst2',
    sectionId: 'uebEvQDJTs',
    col: 0,
    label: 'TEXT',
    payload: {
      content: 'Texxt content 2',
    },
  },
  {
    id: 'tesst2132',
    sectionId: 'uebEvQDJT123',
    col: 0,
    label: 'TEXT',
    payload: {
      content: 'Texxt content 2',
    },
  },
  {
    id: 'tesst3',
    sectionId: 'uebEvQDJTs',
    col: 1,
    label: 'TEXT',
    payload: {
      content: 'Texxt content ddas3',
    },
  },
]
export default function PageEditContainer({}: PageEditContainerProps) {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const [sections, setSections] = useState<IFSection[]>([])
  const [elements, setElements] = useState<IFElement[]>([])
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )
  const handleDeleteSection = () => {
    setSections((sections) => {
      const currentSections = [...sections]
      const currentIndex = sections.findIndex((item) => item.id === activeId)
      currentSections.splice(currentIndex, 1)
      return currentSections
    })
  }

  const handleAddItems = () => {
    const currentSections: IFSection[] = [...sections]
    const newElement: IFSection = {
      id: nanoid(10),
      // id: 'uebEvQDJTs',
      row: 4,
      label: 'SECTION',
      sizeCol: '1-1-1-1',
      payload: {},
    }
    currentSections.push(newElement)
    setSections(currentSections)
  }
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null)
    const { active, over } = event

    if (over && active.id !== over.id) {
      setSections((sections) => {
        const oldIndex = sections.findIndex((section: IFSection) => section.id === active.id)
        const newIndex = sections.findIndex((section: IFSection) => section.id === over.id)
        console.log(oldIndex, newIndex)
        return arrayMove(sections, oldIndex, newIndex)
      })
    }
  }
  const handleDragElementStart = (event: DragStartEvent) => {}
  const handleDragElementEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const activeSection = elements.find((v) => v.id === active.id)?.sectionId
      const overSection = elements.find((v) => v.id === over.id)?.sectionId

      const oldIndex = sections.findIndex((section: IFSection) => section.id === active.id)
      const newIndex = sections.findIndex((section: IFSection) => section.id === over.id)
      if (oldIndex !== newIndex) {
        setElements((items) => {
          if (overSection && activeSection !== overSection) {
            const currentElements = [...items]
            const newElement = { ...items[oldIndex], sectionId: overSection }
            currentElements.splice(oldIndex, 1, newElement)
            return arrayMove(currentElements, oldIndex, newIndex)
          }
          return arrayMove(items, oldIndex, newIndex)
        })
      }
    }
  }
  const handleDragElementOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const activeSection = elements.find((v) => v.id === active.id)?.sectionId
      const overSection = elements.find((v) => v.id === over.id)?.sectionId

      const oldIndex = sections.findIndex((section: IFSection) => section.id === active.id)
      const newIndex = sections.findIndex((section: IFSection) => section.id === over.id)
      if (oldIndex !== newIndex) {
        setElements((items) => {
          if (overSection && activeSection !== overSection) {
            const currentElements = [...items]
            const newElement = { ...items[oldIndex], sectionId: overSection }
            currentElements.splice(oldIndex, 1, newElement)
            return arrayMove(currentElements, oldIndex, newIndex)
          }
          return arrayMove(items, oldIndex, newIndex)
        })
      }
    }
  }
  return (
    <Container py={50} px={0}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
      >
        <SortableContext id="sections" items={sections} strategy={rectSortingStrategy}>
          {sections && sections[0] ? (
            <>
              <Stack spacing="xs">
                {sections.map((section: IFSection) => {
                  return (
                    <SortableContainerItem
                      key={section.id}
                      onActive={setActiveId}
                      idActive={activeId}
                      id={section.id}
                      type={section.label}
                      onDeleteBtn={handleDeleteSection}
                    >
                      <DndContext
                        // announcements={defaultAnnouncements}
                        sensors={sensors}
                        collisionDetection={closestCorners}
                        onDragStart={handleDragElementStart}
                        onDragOver={handleDragElementOver}
                        onDragEnd={handleDragElementEnd}
                      >
                        <SectionPanelUI
                          section={section}
                          setElements={setElements}
                          row={section.row}
                          elements={elements}
                          setActiveId={setActiveId}
                          activeId={activeId}
                        />
                        <DragOverlay>{activeId && <div></div>}</DragOverlay>
                      </DndContext>
                    </SortableContainerItem>
                  )
                })}
                <Group position="center" mt={8}>
                  <Button leftIcon={<IconPlus />} variant="light" onClick={handleAddItems}>
                    Section
                  </Button>
                </Group>
              </Stack>
            </>
          ) : (
            <>
              <Empty label="Drop and drap a section to start" />
              <Group position="center" mt={14}>
                <Button leftIcon={<IconPlus />} variant="light" onClick={handleAddItems}>
                  Section
                </Button>
              </Group>
            </>
          )}
          <DragOverlay>{activeId && <div></div>}</DragOverlay>
        </SortableContext>
      </DndContext>
    </Container>
  )
}
type SectionPanelUIProps = {
  row: number
  elements: IFElement[]

  section: IFSection
  setActiveId: any
  activeId: any
  setElements: any
}
function SectionPanelUI(props: SectionPanelUIProps) {
  const { row, elements, section, activeId, setActiveId, setElements } = props

  const handleDeleteElement = () => {
    setElements((elements: IFElement[]) => {
      const currentElement = [...elements]
      const currentIndex = elements.findIndex((item) => item.id === activeId)
      currentElement.splice(currentIndex, 1)
      return currentElement
    })
  }
  return (
    <SectionContainerPanelUI>
      {Array(row)
        .fill(0)
        .map((_, col) => {
          const elementOfCurrentCol = elements.filter(
            (item: IFElement) => item.col === col && item.sectionId === section.id
          )
          const span = calcSpanCol(section.sizeCol, col)
          const { setNodeRef } = useDroppable({
            id: section.id,
          })

          return (
            <SortableContext
              key={col}
              id={`${section.id}-${col}`}
              items={elementOfCurrentCol}
              strategy={verticalListSortingStrategy}
            >
              {elementOfCurrentCol && elementOfCurrentCol[0] ? (
                <Grid.Col span={span}>
                  <Container ref={setNodeRef} fluid p={0}>
                    {elementOfCurrentCol.map((item: IFElement) => {
                      return (
                        <SortableElementItem
                          key={item.id}
                          onActive={setActiveId}
                          idActive={activeId}
                          id={item.id}
                          type={item.label}
                          onDeleteBtn={handleDeleteElement}
                        >
                          <Text>{item.payload.content}</Text>
                        </SortableElementItem>
                      )
                    })}
                  </Container>
                </Grid.Col>
              ) : (
                <ColEmptyUI span={span} />
              )}
            </SortableContext>
          )
        })}
    </SectionContainerPanelUI>
  )
}
