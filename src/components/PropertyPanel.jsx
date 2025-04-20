const PropertyPanel = ({ element, onUpdate }) => {
  if (!element) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    onUpdate({ ...element, [name]: value });
  };

  return (
    <div className="w-1/4 p-4 border-l bg-white">
      <h3 className="text-lg font-bold mb-4">Edit Field</h3>
      <div className="space-y-4">
        <div>
          <label className="block font-medium">Label</label>
          <input
            type="text"
            name="label"
            value={element.label || ""}
            onChange={handleChange}
            className="w-full border p-1"
          />
        </div>

        {element.type === "text" ||
        element.type === "number" ||
        element.type === "email" ||
        element.type === "password" ? (
          <div>
            <label className="block font-medium">Placeholder</label>
            <input
              type="text"
              name="placeholder"
              value={element.placeholder || ""}
              onChange={handleChange}
              className="w-full border p-1"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PropertyPanel;
