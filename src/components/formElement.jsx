const FormElement = ({ type, label, placeholder, options = [] }) => {
  switch (type) {
    case "text":
      return (
        <div className="element">
          <label className="mb-1">{label || "Text Input: "}</label>
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
        <div className="element">
          <label className="mb-1">{label || "Number Input: "}</label>
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
        <div className="element">
          <label className="mb-1">{label || "Color Picker: "}</label>
          <input type="color" />
        </div>
      );

    case "checkbox":
      return (
        <div className="element">
          <label className="mb-1">{label || "Checkboxes: "}</label>
          {options.length ? (
            <div className="options">
              {options.map((opt, i) => (
                <label key={i} className="option">
                  <input type="checkbox" />
                  {opt}
                </label>
              ))}
            </div>
          ) : (
            <span className="text-gray-500 text-sm">No options provided</span>
          )}
        </div>
      );

    case "radio":
      return (
        <div className="element">
          <label className="mb-1">{label || "Radio Buttons: "}</label>
          {options.length ? (
            <div className="options">
              {options.map((opt, i) => (
                <label key={i} className="option">
                  <input type="radio" name="radio" />
                  {opt}
                </label>
              ))}
            </div>
          ) : (
            <span className="text-gray-500 text-sm">No options provided</span>
          )}
        </div>
      );

    case "select":
      return (
        <div className="element">
          <label className="mb-1">{label || "Select Dropdown: "}</label>
          <select className="element-select">
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
        <div className="element">
          <label className="mb-1">{label || "Multi Select: "}</label>
          <select className="element-multiselect" multiple>
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
        <div className="element">
          <label className="mb-1">{label || "Range Slider: "}</label>
          <input type="range" />
        </div>
      );

    default:
      return <div>Unknown element type</div>;
  }
};

export default FormElement;
