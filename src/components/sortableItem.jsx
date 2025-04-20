import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import FormElement from "./FormElement";

const SortableItem = ({ id, type, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    background: "#f8f8f8",
    padding: "10px",
    borderRadius: "4px",
    minWidth: "fit-content",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <span {...listeners} style={{ cursor: "grab", color: "#000" }}>
        ⠿
      </span>
      <FormElement type={type} />
      <button onClick={() => onDelete(id)}>✕</button>
    </div>
  );
};

export default SortableItem;
