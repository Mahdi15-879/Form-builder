import { useEffect, useState } from "react";
import FormElement from "../components/formElement";
import "../App.css";

const Preview = () => {
  const [savedForms, setSavedForms] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("savedForms")) || [];
    setSavedForms(stored);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ margin: "0", marginBottom: "1rem", color: "#000" }}>
        Saved Forms Preview
      </h1>

      {savedForms.length === 0 ? (
        <p>No saved forms found.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {savedForms.map((form, formIndex) => (
            <div
              key={formIndex}
              style={{
                padding: "1rem",
                border: "2px dashed #aaa",
                borderRadius: "8px",
                backgroundColor: "#fafafa",
              }}
            >
              <h2 style={{ margin: "0", marginBottom: "1rem", color: "#000" }}>
                Form #{formIndex + 1}
              </h2>
              {form.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  style={{
                    display: "flex",
                    gap: "1rem",
                    marginBottom: "1rem",
                    flexWrap: "wrap",
                  }}
                >
                  {row.elements.map((el) => (
                    <div
                      key={el.id}
                      style={{
                        border: "1px solid #ccc",
                        padding: "10px",
                        borderRadius: "5px",
                        minWidth: "150px",
                      }}
                    >
                      <FormElement {...el} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Preview;
