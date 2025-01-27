"use client";
import { closestCorners, DndContext, DragEndEvent } from "@dnd-kit/core";
import { Card, CardContent, Container, Stack, Typography } from "@mui/material";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import KanbanItem from "./KanbanItem";

export type User = {
  id: string;
  name: string;
};

const dummyData: User[] = [
  { id: crypto.randomUUID(), name: "John" },
  { id: crypto.randomUUID(), name: "Jane" },
  { id: crypto.randomUUID(), name: "Alice" },
];

const Kanban = () => {
  const [items, setItems] = useState<User[]>(dummyData);

  const getTakePos = (id: string) => {
    return items.findIndex((task) => task.id === id);
  };

  const handleDrag = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = getTakePos(active.id as string);
      const newIndex = getTakePos(over?.id as string);
      const newItems = arrayMove(items, oldIndex, newIndex);
      setItems(newItems);
    }
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDrag}>
      <SortableContext
        items={items.map((data) => ({ id: data.id }))}
        strategy={verticalListSortingStrategy}
      >
        <Container>
          <Card sx={{ width: 400 }}>
            <Typography variant="h4" textAlign="center">
              To do
            </Typography>
            <CardContent>
              <Stack spacing={2}>
                {items.map((data) => (
                  <KanbanItem key={data.id} data={data} />
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Container>
      </SortableContext>
    </DndContext>
  );
};

export default Kanban;
