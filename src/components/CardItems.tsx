import { useSortable } from "@dnd-kit/sortable";
import { Card, CardContent, Typography, Container } from "@mui/material";
import { User } from "./KanbanBoard";
import { CSS } from "@dnd-kit/utilities";

const CardItems = (props: { user: User }) => {
  const { user } = props;
  const { id, name } = user;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Container ref={setNodeRef} {...attributes} {...listeners} style={style}>
      <Card>
        <CardContent sx={{ marginTop: 2 }}>
          <Typography>{name}</Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CardItems;
