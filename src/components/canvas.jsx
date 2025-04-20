import { useDroppable } from "@dnd-kit/core";
import Row from "./Row";

const Canvas = ({ formRows, onDeleteField, onElementClick }) => {
  const { setNodeRef } = useDroppable({ id: "new-row-dropzone" });

  return (
    <div
      className="canvas-scroll"
      style={{
        flex: 1,
        height: "100%",
        width: "100%",
        border: "2px dashed #aaa",
        padding: "20px",
        background: "#fff",
        boxSizing: "border-box",
        borderRadius: "8px",
        overflowY: "scroll",
        overflowX: "hidden",
      }}
    >
      <h3 style={{ color: "#000" }}>Form Builder</h3>
      {formRows.map((row) => (
        <Row
          key={row.id}
          row={row}
          onDelete={onDeleteField}
          onElementClick={onElementClick}
        />
      ))}

      {formRows?.length < 6 && (
        <div
          ref={setNodeRef}
          style={{
            padding: "20px",
            marginTop: "2rem",
            border: "2px dashed #ccc",
            textAlign: "center",
            color: "#aaa",
            borderRadius: "8px",
          }}
        >
          Drop here to add a new row
        </div>
      )}
    </div>
  );
};

export default Canvas;
