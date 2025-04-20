export default function SettingsPanel({ element, updateElement, close }) {
  const handleChange = (e) => {
    updateElement(element.id, { [e.target.name]: e.target.value });
  };

  const handleCheckbox = (e) => {
    updateElement(element.id, { [e.target.name]: e.target.checked });
  };

  return (
    <div className="w-1/4 p-4 border-l bg-white h-full shadow-xl">
      <h3 className="text-xl font-semibold mb-4">Edit Settings</h3>

      <label className="block mb-3">
        Label:
        <input
          name="label"
          value={element.label}
          onChange={handleChange}
          className="border p-1 w-full"
        />
      </label>

      {element.type === "text" && (
        <label className="block mb-3">
          Placeholder:
          <input
            name="placeholder"
            value={element.placeholder}
            onChange={handleChange}
            className="border p-1 w-full"
          />
        </label>
      )}

      {element.type === "range" && (
        <>
          <label className="block mb-3">
            Min:
            <input
              name="min"
              value={element.min}
              onChange={handleChange}
              className="border p-1 w-full"
              type="number"
            />
          </label>
          <label className="block mb-3">
            Max:
            <input
              name="max"
              value={element.max}
              onChange={handleChange}
              className="border p-1 w-full"
              type="number"
            />
          </label>
        </>
      )}

      <label className="block mb-4">
        <input
          type="checkbox"
          name="required"
          checked={element.required}
          onChange={handleCheckbox}
          className="mr-2"
        />
        Required
      </label>

      <button
        onClick={close}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Done
      </button>
    </div>
  );
}
