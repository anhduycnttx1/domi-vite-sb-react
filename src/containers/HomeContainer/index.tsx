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
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { Button, Container, Flex, Grid, Group, Stack } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import React, { useState } from "react";
import { nanoid } from "nanoid";
import Empty from "../../components/Empty";
import SortableRowItem from "../../components/SortableItem";
import ContentBlocksEmpty from "../../components/Empty/ContentBlocksEmpty";

type HomeContainerProps = {};

type ItemType = {
  id: string;
  label: string;
  row: number;
  children: any[];
  col: string;
};

export default function HomeContainer({}: HomeContainerProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [items, setItems] = useState<ItemType[]>([]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const handleDeleteItems = () => {
    setItems((items) => {
      const currentItems = [...items];
      const currentIndex = items.findIndex((item) => item.id === activeId);
      currentItems.splice(currentIndex, 1);
      return currentItems;
    });
  };
  const handleAddItems = () => {
    const currentItems: ItemType[] | null = [...items];
    const newElement: ItemType = {
      id: nanoid(10),
      row: 6,
      label: "SECTION",
      children: [],
      col: "2-2-2-2-2-2",
    };
    currentItems.push(newElement);
    setItems(currentItems);
  };
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        console.log(oldIndex, newIndex);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };
  return (
    <Container py={50}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
      >
        <SortableContext items={items} strategy={rectSortingStrategy}>
          {items && items[0] ? (
            <Stack spacing="xs">
              {items.map((item) => (
                <SortableRowItem
                  key={item.id}
                  onActive={setActiveId}
                  idActive={activeId}
                  id={item.id}
                  type={item.label}
                  onDeleteBtn={handleDeleteItems}
                >
                  <RowPanel item={item} />
                </SortableRowItem>
              ))}
              <Button
                leftIcon={<IconPlus />}
                variant="light"
                onClick={handleAddItems}
              >
                Section
              </Button>
            </Stack>
          ) : (
            <>
              <Empty label="Drop and drap a section to start" />
              <Group position="center" mt={14}>
                <Button
                  leftIcon={<IconPlus />}
                  variant="light"
                  onClick={handleAddItems}
                >
                  Section
                </Button>
              </Group>
            </>
          )}
          <DragOverlay>{activeId && <div></div>}</DragOverlay>
        </SortableContext>
      </DndContext>
    </Container>
  );
}

type RowPanelProps = {
  item: ItemType;
};
function RowPanel({ item }: RowPanelProps) {
  const calcSpanCol = (str: string, index: number) => {
    const arr = item.col.split("-");
    const count = arr.reduce(
      (accumulator, currentValue) => accumulator + Number(currentValue),
      0
    );
    return (12 / count) * Number(arr[index]);
  };
  return (
    <Grid gutter="sm" m={0} sx={{ minHeight: 150 }}>
      {Array(item.row)
        .fill(0)
        .map((_, index) => {
          const curreList = item.children.filter((v) => v.index === index);
          const span = calcSpanCol(item.col, index);
          return (
            <React.Fragment key={index}>
              {curreList[0] ? null : <EmptyChildRow span={span} />}
            </React.Fragment>
          );
        })}
    </Grid>
  );
}

function EmptyChildRow({ span }: any) {
  return (
    <Grid.Col
      span={span}
      sx={(theme) => ({
        backgroundColor: theme.colors.blue[1],
        borderWidth: "1px",
        borderStyle: "dotted",
        borderColor: theme.colors.blue[7],
        display: "flex",
      })}
    >
      <Flex align="center" justify="center" w={"100%"}>
        <ContentBlocksEmpty />
      </Flex>
    </Grid.Col>
  );
}
