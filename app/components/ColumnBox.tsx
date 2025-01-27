import { Box, Card, Typography } from "@mui/material";
import TaskCard from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";
import { ColumnBoxProps } from "../types/Column";

const ColumnBox = ({ columns, tasks }: ColumnBoxProps) => {
  const { setNodeRef } = useDroppable({
    id: columns.id,
  });
  return (
    <Card className="flex w-80 flex-col p-4">
      <Typography variant="h5">{columns.title}</Typography>
      <Box ref={setNodeRef} className="flex flex-1 flex-col gap-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </Box>
    </Card>
  );
};

export default ColumnBox;
