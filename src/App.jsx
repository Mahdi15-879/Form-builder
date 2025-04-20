import "./App.css";
import { useState } from "react";
import { DndContext, rectIntersection, DragOverlay } from "@dnd-kit/core";

import { v4 as uuidv4 } from "uuid";

import Sidebar from "./components/Sidebar";
import Canvas from "./components/Canvas";
import FormElement from "./components/FormElement";
import PropertyPanel from "./components/PropertyPanel";

function App() {
  const [formRows, setFormRows] = useState([]);
  const [activeDragItem, setActiveDragItem] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);

  const handleDragStart = (event) => {
    const { active } = event;

    if (!active.data?.current) {
      setActiveDragItem({ type: active.id });
    } else {
      const foundRow = formRows.find((row) =>
        row.elements.find((item) => item.id === active.id)
      );

      const foundItem = foundRow?.elements.find(
        (item) => item.id === active.id
      );
      setActiveDragItem(foundItem || null);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveDragItem(null);
    if (!over) return;

    const isFromSidebar = !active.data?.current;

    if (isFromSidebar) {
      const newElement = {
        id: uuidv4(),
        type: active.id,
      };

      const overData = over?.data?.current;
      const targetRowId = overData?.type === "row" ? over.id : null;

      if (targetRowId) {
        setFormRows((prev) =>
          prev.map((row) =>
            row.id === targetRowId
              ? { ...row, elements: [...row.elements, newElement] }
              : row
          )
        );
      } else if (over.id === "new-row-dropzone") {
        setFormRows((prev) => [
          ...prev,
          {
            id: uuidv4(),
            elements: [newElement],
          },
        ]);
      }
    }
  };

  const handleDeleteField = (id) => {
    setFormRows((prev) =>
      prev
        .map((row) => ({
          ...row,
          elements: row.elements.filter((el) => el.id !== id),
        }))
        .filter((row) => row.elements.length > 0)
    );
  };

  const handleElementClick = (elementId) => {
    const foundRow = formRows.find((row) =>
      row.elements.find((item) => item.id === elementId)
    );

    const foundItem = foundRow?.elements.find((item) => item.id === elementId);
    if (foundItem) {
      setSelectedElement({ ...foundItem, rowId: foundRow.id });
    }
  };

  const updateElementProperty = (updatedElement) => {
    setFormRows((prevRows) =>
      prevRows.map((row) =>
        row.id === updatedElement.rowId
          ? {
              ...row,
              elements: row.elements.map((el) =>
                el.id === updatedElement.id ? updatedElement : el
              ),
            }
          : row
      )
    );
  };

  return (
    <DndContext
      collisionDetection={rectIntersection}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div
        className="app-container"
        style={{ display: "flex", padding: 20, width: "100%", gap: "2rem" }}
      >
        <Sidebar formRows={formRows} setFormRows={setFormRows} />
        <Canvas
          formRows={formRows}
          onDeleteField={handleDeleteField}
          onElementClick={handleElementClick}
        />
        {formRows?.length > 0 && (
          <PropertyPanel
            element={selectedElement}
            onUpdate={(updated) => {
              updateElementProperty(updated);
              setSelectedElement(updated);
            }}
          />
        )}
      </div>

      <DragOverlay>
        {activeDragItem ? (
          <div
            style={{
              padding: "10px 15px",
              background: "#eee",
              border: "1px solid #aaa",
              borderRadius: "4px",
              fontWeight: "bold",
              minWidth: "200px",
            }}
          >
            <FormElement type={activeDragItem.type} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default App;
