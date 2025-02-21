import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  closestCorners,
  TouchSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import UseDraggable from "./useDraggable";
import { Button, Stack } from "@mui/material";
import { CommonSlideProps } from "../../../../types/Product";

type Props<T> = {
  items: T[];
  handleItems: (slide: T[]) => void;
  mode?: "dark" | "light";
  toggleDialog: (item?: T) => void;
  overFlow?: boolean;
  handleOnClick?: (item: T) => void;
};

const UseDroppable = <T extends CommonSlideProps>(props: Props<T>) => {
  const {
    items,
    handleItems,
    mode,
    toggleDialog,
    overFlow = false,
    handleOnClick,
  } = props;

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 250, tolerance: 5 },
    })
  );

  const getSlideIndex = (id: string) =>
    items.findIndex((item) => item.uniqueId === id);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = getSlideIndex(active.id as string);
      const newIndex = getSlideIndex(over?.id as string);
      const newItems = arrayMove(items, oldIndex, newIndex);
      handleItems(newItems);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      <Stack
        direction="row"
        sx={{
          flexWrap: overFlow ? "nowrap" : "wrap",
          overflowX: "auto",
        }}
      >
        <SortableContext
          items={items.map((data) => ({ id: data.uniqueId ?? "" }))}
          strategy={rectSortingStrategy}
        >
          {items.map((item) => {
            const id = item.uniqueId;
            return (
              <UseDraggable
                key={id}
                id={id ?? ""}
                thumbnail={item.thumbnailUrl ?? ""}
                handleClick={() => handleOnClick?.(item)}
              />
            );
          })}
        </SortableContext>
        <Stack>
          <Button
            sx={{
              border: "2px dashed",
              width: 125,
              height: 125,
              borderColor: mode === "dark" ? "#374151" : "#d1d5db",
              borderRadius: 1,
            }}
            onClick={() => toggleDialog}
          >
            + Add
          </Button>
        </Stack>
      </Stack>
    </DndContext>
  );
};

export default UseDroppable;
