import "./App.css";
import { useState } from "react";
import { DndContext, rectIntersection, DragOverlay } from "@dnd-kit/core";

import { v4 as uuidv4 } from "uuid";

import Sidebar from "./components/Sidebar";
import Canvas from "./components/Canvas";
import PropertyPanel from "./components/PropertyPanel";

const elements = [
  { id: "text", label: "Text Input" },
  { id: "number", label: "Number Input" },
  { id: "color", label: "Color Picker" },
  { id: "checkbox", label: "Checkbox" },
  { id: "radio", label: "Radio Buttons" },
  { id: "select", label: "Select Dropdown" },
  { id: "multiselect", label: "Multi Select" },
  { id: "range", label: "Range Slider" },
];

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
          prev.map((row) => {
            if (row.id === targetRowId) {
              if (row.elements.length >= 3) {
                alert("Each row can only contain up to 3 elements.");
                return row;
              }
              return { ...row, elements: [...row.elements, newElement] };
            }
            return row;
          })
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

    if (selectedElement?.id === id) {
      setTimeout(() => {
        setSelectedElement(null);
      }, 0);
    }
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

  const getLabelById = (id) => {
    const found = elements.find((el) => el.id === id);
    return found ? found.label : "Unknown Element";
  };

  return (
    <DndContext
      collisionDetection={rectIntersection}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div
        className="app-container"
        style={{ display: "flex", padding: 20, width: "100%", gap: "1rem" }}
      >
        <div className="sidebar-container">
          <Sidebar
            formRows={formRows}
            setFormRows={setFormRows}
            setSelectedElement={setSelectedElement}
          />

          {selectedElement && (
            <PropertyPanel
              element={selectedElement}
              onUpdate={(updated) => {
                updateElementProperty(updated);
                setSelectedElement(updated);
              }}
            />
          )}
        </div>

        <Canvas
          formRows={formRows}
          onDeleteField={handleDeleteField}
          onElementClick={handleElementClick}
          selectedElementId={selectedElement?.id}
        />
      </div>

      <DragOverlay>
        {activeDragItem ? (
          <div
            style={{
              padding: "0.7rem 0",
              border: "1px solid #aaa",
              borderRadius: "5px",
              minWidth: "200px",
              backgroundColor: "#fff",
              textAlign: "center",
              cursor: "grab",
              color: "#000",
            }}
          >
            {getLabelById(activeDragItem.type)}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default App;
