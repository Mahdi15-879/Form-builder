import { useDroppable } from "@dnd-kit/core";
import SortableItem from "./SortableItem";

const Row = ({ row, onDelete }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: row.id,
    data: { type: "row" },
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
        marginBottom: "1rem",
        background: isOver ? "#e0f7ff" : "#f4f4f4",
        padding: "20px",
        border: isOver ? "2px dashed #00aaff" : "2px dashed transparent",
        borderRadius: "6px",
        minHeight: "80px",
        position: "relative",
      }}
    >
      {row.elements.map((field) => (
        <SortableItem
          key={field.id}
          id={field.id}
          type={field.type}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default Row;
