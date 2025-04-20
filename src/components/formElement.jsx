const FormElement = ({ type, label, placeholder, options = [] }) => {
  switch (type) {
    case "text":
      return (
        <div className="flex flex-col">
          <label className="mb-1">{label || "Text Input"}</label>
          <input
            type="text"
            className="border p-2 rounded"
            placeholder={placeholder || "Enter text..."}
            disabled
          />
        </div>
      );

    case "number":
      return (
        <div className="flex flex-col">
          <label className="mb-1">{label || "Number Input"}</label>
          <input
            type="number"
            className="border p-2 rounded"
            placeholder={placeholder || "Enter number..."}
            disabled
          />
        </div>
      );

    case "color":
      return (
        <div className="flex flex-col">
          <label className="mb-1">{label || "Color Picker"}</label>
          <input type="color" disabled />
        </div>
      );

    case "checkbox":
      return (
        <div className="flex items-center gap-2">
          <input type="checkbox" disabled />
          <label>{label || "Checkbox"}</label>
        </div>
      );

    case "radio":
      return (
        <div className="flex flex-col">
          <label className="mb-1">{label || "Radio Buttons"}</label>
          {options.length ? (
            options.map((opt, i) => (
              <label key={i} className="flex items-center gap-2">
                <input type="radio" name="radio" disabled />
                {opt}
              </label>
            ))
          ) : (
            <span className="text-gray-500 text-sm">No options provided</span>
          )}
        </div>
      );

    case "select":
      return (
        <div className="flex flex-col">
          <label className="mb-1">{label || "Select Dropdown"}</label>
          <select className="border p-2 rounded" disabled>
            {options.length ? (
              options.map((opt, i) => <option key={i}>{opt}</option>)
            ) : (
              <option>No options</option>
            )}
          </select>
        </div>
      );

    case "multiselect":
      return (
        <div className="flex flex-col">
          <label className="mb-1">{label || "Multi Select"}</label>
          <select className="border p-2 rounded" multiple disabled>
            {options.length ? (
              options.map((opt, i) => <option key={i}>{opt}</option>)
            ) : (
              <option>No options</option>
            )}
          </select>
        </div>
      );

    case "range":
      return (
        <div className="flex flex-col">
          <label className="mb-1">{label || "Range Slider"}</label>
          <input type="range" disabled />
        </div>
      );

    default:
      return <div>Unknown element type</div>;
  }
};

export default FormElement;
