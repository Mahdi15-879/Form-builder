import { useDraggable } from "@dnd-kit/core";

const Item = ({ id, label, className }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id,
  });

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} className={className}>
      {label}
    </div>
  );
};

const Sidebar = ({ formRows, setFormRows, setSelectedElement }) => {
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
    <div className="sidebar">
      <h2 className="sidebar-title">Form Elements</h2>
      <div className="sidebar-elements">
        {elements.map((el) => (
          <Item
            key={el.id}
            id={el.id}
            label={el.label}
            className="sidebar-element"
          />
        ))}
      </div>

      <div className="sidebar-buttons">
        <button
          onClick={() => {
            setFormRows([]);
            setSelectedElement(null);
          }}
        >
          Clear
        </button>
        <button onClick={saveForm}>Save</button>
      </div>
    </div>
  );
};

export default Sidebar;
