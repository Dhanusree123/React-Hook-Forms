"use client";
import { closestCorners, DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Card, CardContent, Grid2, Stack, Typography } from "@mui/material";
import { useState } from "react";
import CardItems from "./CardItems";

export type User = {
  id: number;
  name: string;
  status: string;
};

type Head = {
  id: string;
  title: string;
};

const Heading: Head[] = [
  {
    id: "Task",
    title: "Task",
  },
  {
    id: "Process",
    title: "Process",
  },
  {
    id: "Complete",
    title: "Complete",
  },
];

const dummyData: User[] = [
  {
    id: 1,
    name: "John",
    status: "Task",
  },
  {
    id: 2,
    name: "Jane",
    status: "Task",
  },
  {
    id: 3,
    name: "Alice",
    status: "Task",
  },
];

const KanbanBoard = () => {
  const [userData, setUserData] = useState<User[]>(dummyData);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      return;
    }

    if (over && active.id !== over.id) {
      setUserData((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const movedItem = items[oldIndex];
        items[oldIndex] = { ...movedItem, status: Heading[newIndex] };
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };
  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <SortableContext items={userData} strategy={verticalListSortingStrategy}>
        <Grid2 container spacing={2}>
          {Heading.map((head) => (
            <Grid2 size={{ xs: 4 }} key={head.id}>
              <Card sx={{ minHeight: 500 }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {head.title}
                  </Typography>
                  <Stack spacing={2} marginTop={3}>
                    {userData
                      .filter((user) => user.status === head.id)
                      .map((user) => (
                        <CardItems user={user} key={user.id} />
                      ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </SortableContext>
    </DndContext>
  );
};

export default KanbanBoard;
