import { useEffect, useState } from "react";
import FormElement from "../components/formElement";
import download from "../assets/download.svg";
import "../App.css";

const Preview = () => {
  const [savedForms, setSavedForms] = useState([]);

  const downloadFormAsJson = (form, index) => {
    const fileData = JSON.stringify(form, null, 2);
    const blob = new Blob([fileData], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `form-${index + 1}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <h2
                  style={{ margin: "0", marginBottom: "1rem", color: "#000" }}
                >
                  Form #{formIndex + 1}
                </h2>

                <img
                  src={download}
                  onClick={() => downloadFormAsJson(form, formIndex)}
                  alt="Download Icon"
                  style={{ width: "30px", height: "30px", cursor: "pointer" }}
                />
              </div>
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
