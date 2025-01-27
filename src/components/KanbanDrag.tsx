import { Card, CardContent, Typography } from "@mui/material";
import { User } from "./Kanban";
import { useSortable } from "@dnd-kit/sortable";

type Props = {
  data: User;
};

const KanbanDrag = ({ data }: Props) => {
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: data.id,
  });
  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };
  return (
    <Card ref={setNodeRef} {...attributes} {...listeners} style={style}>
      <CardContent>
        <Typography>{data.name}</Typography>
      </CardContent>
    </Card>
  );
};

export default KanbanDrag;
