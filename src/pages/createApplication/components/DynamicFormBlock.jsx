import React from "react";
import InputField from "../../../widgets/Input/input-field/InputField";
import SelectField from "../../../widgets/Input/select-field/SelectField";
import ButtonsField from "../../../widgets/Input/buttons-field/ButtonsField";
import RangeField from "../../../widgets/Input/range-field/RangeField";

export default function DynamicFormBlock({ section, values, onChange }) {
  const renderField = (field) => {
    switch (field.type) {
      case "select":
        return (
          <SelectField
            id={field.id}
            label={field.label}
            options={field.options}
            value={values[field.id] || ""}
            onChange={(e) =>
              onChange({ target: { id: field.id, value: e.target.value } })
            }
            placeholder={field.placeholder}
            required={field.required}
          />
        );
      case "buttons":
        return (
          <ButtonsField
            id={field.id}
            label={field.label}
            options={field.options}
            value={values[field.id] || field.options[1]} // Default to middle
            onChange={onChange}
            required={field.required}
          />
        );
      case "range":
        return (
          <RangeField
            id={field.id}
            label={field.label}
            value={values[field.id]}
            onChange={onChange}
            required={field.required}
          />
        );
      default:
        // Text, URL, Date, etc
        return (
          <InputField
            id={field.id}
            label={field.label}
            value={values[field.id] || ""}
            placeholder={field.placeholder}
            onChange={onChange}
            required={field.required}
            type={field.type === "date" ? "date" : "text"}
          />
        );
    }
  };

  return (
    <div className="form-section-content">
      {section.rows.map((row, rowIndex) => (
        <div key={rowIndex} className={`field-${row.layout}`}>
          {row.fields.map((field, fieldIndex) => (
            <div className="field-item" key={fieldIndex}>
              {renderField(field)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
