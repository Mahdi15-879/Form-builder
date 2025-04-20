import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import FormElement from "./FormElement";

const SortableItem = ({ element, onDelete, onClick, selectedElementId }) => {
  const { id } = element;
  const { attributes, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    background: "#fff",
    padding: "10px",
    borderRadius: "6px",
    minWidth: "200px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    position: "relative",
    border: "2px solid #fff",
  };

  const activeStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    background: "#e0f7ff",
    padding: "10px",
    borderRadius: "6px",
    minWidth: "200px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    position: "relative",
    border: "2px dashed #00aaff",
  };

  return (
    <div
      ref={setNodeRef}
      style={selectedElementId === id ? activeStyle : style}
      {...attributes}
      onClick={() => onClick(id)}
    >
      <FormElement {...element} />
      <button
        onClick={(e) => {
          onDelete(id);
          e.stopPropagation();
        }}
        style={{
          position: "absolute",
          borderRadius: "50%",
          padding: "1px 7px 3px 6px",
          right: "-15px",
          top: "-15px",
        }}
      >
        ✕
      </button>
    </div>
  );
};

export default SortableItem;
