import {
  SortableContext,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
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
      <span {...listeners} style={{ cursor: "grab" }}>
        ⠿
      </span>
      <FormElement type={type} />
      <button onClick={() => onDelete(id)}>✕</button>
    </div>
  );
};

const Canvas = ({ formFields, onDeleteField }) => {
  const { setNodeRef } = useDroppable({ id: "canvas-dropzone" });

  return (
    <div
      ref={setNodeRef}
      style={{
        flex: 1,
        height: "100%",
        width: "100%",
        border: "2px dashed #aaa",
        padding: "20px",
        background: "#fff",
        boxSizing: "border-box",
      }}
    >
      <h3 style={{ color: "#000" }}>Form Builder</h3>
      {formFields.length === 0 && (
        <p style={{ color: "#000" }}>Drag elements here</p>
      )}

      <SortableContext
        items={formFields.map((f) => f.id)}
        strategy={rectSortingStrategy}
      >
        {formFields.map((field) => (
          <SortableItem
            key={field.id}
            id={field.id}
            type={field.type}
            onDelete={onDeleteField}
          />
        ))}
      </SortableContext>
    </div>
  );
};

export default Canvas;
