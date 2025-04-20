import { useDraggable } from "@dnd-kit/core";

const Item = ({ id, label }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="cursor-move bg-white p-3 border rounded-md shadow-sm hover:bg-gray-100"
    >
      {label}
    </div>
  );
};

const Sidebar = ({ formRows, setFormRows }) => {
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

  const saveForm = () => {
    const savedForms = JSON.parse(localStorage.getItem("savedForms")) || [];

    const lastSaved = savedForms[savedForms.length - 1];

    const areEqual = JSON.stringify(lastSaved) === JSON.stringify(formRows);

    if (areEqual) {
      alert("No changes detected. Form not saved.");
      return;
    }

    const newForms = [...savedForms, formRows];
    localStorage.setItem("savedForms", JSON.stringify(newForms));
    alert("New form version saved!");
  };

  return (
    <div className="w-1/4 p-4 border-r">
      <h2 className="text-lg font-bold mb-4">Form Elements</h2>
      <div className="space-y-3">
        {elements.map((el) => (
          <Item key={el.id} id={el.id} label={el.label} />
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <button onClick={() => setFormRows([])}>Clear</button>
        <button onClick={saveForm}>Save</button>
      </div>
    </div>
  );
};

export default Sidebar;
