"use client";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  Card,
  CardContent,
  Container,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import CardItems from "./CardItems";

export type User = {
  id: number;
  name: string;
};

const dummyData: User[] = [
  {
    id: 1,
    name: "John",
  },
  {
    id: 2,
    name: "Jane",
  },
  {
    id: 3,
    name: "Alice",
  },
];

const KanbanBoard = () => {
  const [userData, setUserData] = useState<User[]>(dummyData);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setUserData((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };
  return (
    <Container>
      <Grid2 container direction="row">
        <Card sx={{ width: 400 }}>
          <CardContent>
            <Typography variant="h5">Task</Typography>
            <Stack spacing={2} marginTop={3}>
              <DndContext onDragEnd={handleDragEnd}>
                <SortableContext
                  items={userData}
                  strategy={verticalListSortingStrategy}
                >
                  {userData.map((user) => (
                    <CardItems user={user} key={user.id} />
                  ))}
                </SortableContext>
              </DndContext>
            </Stack>
          </CardContent>
        </Card>
      </Grid2>
    </Container>
  );
};

export default KanbanBoard;
