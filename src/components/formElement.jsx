const FormElement = ({ type }) => {
  switch (type) {
    case "text":
      return (
        <label>
          Text: <input type="text" className="border p-1 ml-1" />
        </label>
      );
    case "number":
      return (
        <label>
          Number: <input type="number" className="border p-1 ml-1" />
        </label>
      );
    case "color":
      return (
        <label>
          Color: <input type="color" className="ml-1" />
        </label>
      );
    case "checkbox":
      return (
        <label>
          <input type="checkbox" className="mr-1" />
          Checkbox
        </label>
      );
    case "radio":
      return (
        <div>
          <label>
            <input type="radio" name="group" /> Option 1
          </label>
          <br />
          <label>
            <input type="radio" name="group" /> Option 2
          </label>
        </div>
      );
    case "select":
      return (
        <label>
          Select:
          <select className="border p-1 ml-1">
            <option>Option 1</option>
            <option>Option 2</option>
          </select>
        </label>
      );
    case "multiselect":
      return (
        <label>
          Multi Select:
          <select multiple className="border p-1 ml-1">
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
          </select>
        </label>
      );
    case "range":
      return (
        <label>
          Range:
          <input type="range" min="0" max="100" step="5" className="ml-2" />
        </label>
      );
    default:
      return null;
  }
};

export default FormElement;
