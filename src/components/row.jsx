import { useDroppable } from "@dnd-kit/core";
import SortableItem from "./sortableItem.jsx";

const Row = ({ row, onDelete, onElementClick, selectedElementId }) => {
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
        gap: "1.5rem",
        marginBottom: "1rem",
        background: isOver ? "#e0f7ff" : "#f4f4f4",
        padding: "1rem",
        border: isOver ? "2px dashed #00aaff" : "2px dashed transparent",
        borderRadius: "6px",
        minHeight: "80px",
        position: "relative",
        marginTop: "1.5rem",
      }}
    >
      {row.elements.map((field) => (
        <SortableItem
          key={field.id}
          element={field}
          onDelete={onDelete}
          onClick={onElementClick}
          selectedElementId={selectedElementId}
        />
      ))}
    </div>
  );
};

export default Row;
