"use client";
import { Box } from "@mui/material";
import { useState } from "react";
import ColumnBox from "./ColumnBox";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { ColumnType, TaskType } from "../types/Column";

const COLUMNS: ColumnType[] = [
  {
    id: "PENDING",
    title: "Pending Tasks",
  },
  {
    id: "SUCCESS",
    title: "Completed Tasks",
  },
  {
    id: "FAILURE",
    title: "Failed Tasks",
  },
];

const INITIAL_TASKS: TaskType[] = [
  {
    id: "1",
    title: "Medical Project",
    description: "Gather all the medical reports of patients",
    status: "PENDING",
  },
  {
    id: "2",
    title: "Environment Project",
    description: "Gather all the forest reports",
    status: "SUCCESS",
  },
  {
    id: "3",
    title: "Road construction",
    description: "Gather all the construction details of roads",
    status: "SUCCESS",
  },
  {
    id: "4",
    title: "Building Apartments",
    description: "Gather the sketch of construction",
    status: "PENDING",
  },
  {
    id: "5",
    title: "IT ALERT",
    description: "Ride on Illegal constructions",
    status: "FAILURE",
  },
];
const MainPage = () => {
  const [tasks, setTasks] = useState<TaskType[]>(INITIAL_TASKS);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as TaskType["status"];

    setTasks(() =>
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <>
      <Box className="p-4">
        <Box className="flex gap-8">
          <DndContext onDragEnd={handleDragEnd}>
            {COLUMNS.map((col) => (
              <ColumnBox
                key={col.id}
                columns={col}
                tasks={tasks.filter((task) => task.status === col.id)}
              />
            ))}
          </DndContext>
        </Box>
      </Box>
    </>
  );
};

export default MainPage;
