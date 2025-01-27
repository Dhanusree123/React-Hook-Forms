import { Box, Typography } from "@mui/material";
import { TaskType } from "../types/Column";
import { useDraggable } from "@dnd-kit/core";

type TaskCard = {
  task: TaskType;
};

const TaskCard = ({ task }: TaskCard) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? { transform: `translate(${transform.x}px,${transform.y}px)` }
    : undefined;
  return (
    <Box
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="cursor-grab rounded-lg  p-4 shadow-sm hover:shadow-md"
    >
      <Typography variant="h6">{task.title}</Typography>
      <Typography>{task.description}</Typography>
    </Box>
  );
};

export default TaskCard;
