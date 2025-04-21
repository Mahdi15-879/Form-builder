import { useDroppable } from "@dnd-kit/core";
import Row from "./row.jsx";

const Canvas = ({
  formRows,
  onDeleteField,
  onElementClick,
  selectedElementId,
}) => {
  const { setNodeRef, isOver } = useDroppable({ id: "new-row-dropzone" });

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
      <h2 style={{ color: "#000", margin: "0", fontSize: "2rem" }}>
        Form Builder
      </h2>
      {formRows.map((row) => (
        <Row
          key={row.id}
          row={row}
          onDelete={onDeleteField}
          onElementClick={onElementClick}
          selectedElementId={selectedElementId}
        />
      ))}

      {formRows?.length < 6 && (
        <div
          ref={setNodeRef}
          style={{
            padding: "20px",
            marginTop: "2rem",
            border: `2px dashed ${isOver ? "#00aaff" : "#aaa"}`,
            textAlign: "center",
            color: isOver ? "#00aaff" : "#aaa",
            borderRadius: "8px",
            background: isOver ? "#e0f7ff" : "transparent",
          }}
        >
          Drop here to add a new row
        </div>
      )}
    </div>
  );
};

export default Canvas;
