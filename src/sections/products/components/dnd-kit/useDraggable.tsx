import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Stack } from "@mui/material";
import CustomImage from "../../../../components/CustomImage";

type Props = {
  id: string;
  thumbnail: string;
  handleClick?: () => void;
  mode?: "dark" | "light";
};

const UseDraggable = (props: Props) => {
  const { id, thumbnail, handleClick, mode } = props;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style: React.CSSProperties = {
    width: 125,
    position: "relative",
    transform: CSS.Transform.toString(transform),
    transition,
    borderRadius: 1,
    touchAction: "none",
    flexShrink: 0,
  };

  return (
    <Stack
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={handleClick}
      sx={{ m: 1 }}
    >
      <CustomImage
        src={thumbnail}
        sx={{
          width: "100%",
          aspectRatio: "1 / 1",
          background: mode === "dark" ? "#374151" : "#d1d5db",
          objectFit: "contain",
          borderRadius: 1,
        }}
      />
    </Stack>
  );
};

export default UseDraggable;
