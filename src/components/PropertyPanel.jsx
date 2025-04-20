const PropertyPanel = ({ element, onUpdate }) => {
  if (!element) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    onUpdate({ ...element, [name]: value });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...(element.options || [])];
    newOptions[index] = value;

    const filteredOptions = newOptions.filter((opt) => opt?.trim());

    onUpdate({ ...element, options: filteredOptions });
  };

  const renderOptionsInputs = () => {
    const options = element.options || ["", "", ""];

    while (options.length < 3) {
      options.push("");
    }

    return (
      <div className="edit-options">
        <label>Options:</label>
        {options.slice(0, 3).map((opt, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Option ${index + 1}`}
            value={opt}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            className="w-full border p-1"
          />
        ))}
      </div>
    );
  };

  return (
    <div className="edit-panel">
      <h2 className="edit-title">Edit Panel</h2>
      <div className="edit-body">
        <div className="edit-label">
          <label>Label:</label>
          <input
            type="text"
            name="label"
            value={element.label || ""}
            onChange={handleChange}
          />
        </div>

        {(element.type === "text" ||
          element.type === "number" ||
          element.type === "email" ||
          element.type === "password") && (
          <div className="edit-placeholder">
            <label className="block font-medium">Placeholder:</label>
            <input
              type="text"
              name="placeholder"
              value={element.placeholder || ""}
              onChange={handleChange}
              className="w-full border p-1"
            />
          </div>
        )}

        {(element.type === "select" ||
          element.type === "multiselect" ||
          element.type === "checkbox" ||
          element.type === "radio") &&
          renderOptionsInputs()}
      </div>
    </div>
  );
};

export default PropertyPanel;
