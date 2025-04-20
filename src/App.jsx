import "./App.css";
import { useState } from "react";
import { DndContext, closestCenter, DragOverlay } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { v4 as uuidv4 } from "uuid";

import Sidebar from "./components/Sidebar";
import Canvas from "./components/Canvas";
import FormElement from "./components/FormElement";

function App() {
  const [formFields, setFormFields] = useState([]);
  const [activeDragItem, setActiveDragItem] = useState(null); // 👈

  const handleDragStart = (event) => {
    const { active } = event;

    // اگر از sidebar می‌کشیم
    if (!active.data?.current) {
      setActiveDragItem({ type: active.id });
    } else {
      // اگر از داخل canvas می‌کشیم
      const found = formFields.find((item) => item.id === active.id);
      setActiveDragItem(found);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    setActiveDragItem(null); // reset

    // Drop from sidebar into canvas
    if (
      active &&
      over &&
      active.id !== over.id &&
      active.data?.current == null
    ) {
      const newField = {
        id: uuidv4(),
        type: active.id,
      };

      setFormFields((prev) => [...prev, newField]);
      return;
    }

    // Sort inside canvas
    if (active && over && active.data?.current && over.id !== active.id) {
      const oldIndex = formFields.findIndex((item) => item.id === active.id);
      const newIndex = formFields.findIndex((item) => item.id === over.id);
      setFormFields((fields) => arrayMove(fields, oldIndex, newIndex));
    }
  };

  const handleDeleteField = (id) => {
    setFormFields((prev) => prev.filter((field) => field.id !== id));
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div
        className="app-container"
        style={{ display: "flex", padding: 20, width: "100%", gap: "2rem" }}
      >
        <Sidebar />
        <Canvas formFields={formFields} onDeleteField={handleDeleteField} />
      </div>

      {/* 👇 DragOverlay goes here */}
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
