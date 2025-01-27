import { useDroppable } from "@dnd-kit/core";
import { Stack } from "@mui/material";
import KanbanDrag from "./KanbanDrag";
import { User } from "./Kanban";

type Props = {
  data: User;
};

const KanbanItem = ({ data }: Props) => {
  const { setNodeRef } = useDroppable({ id: data.id });
  return (
    <Stack ref={setNodeRef}>
      <KanbanDrag data={data} />
    </Stack>
  );
};

export default KanbanItem;
