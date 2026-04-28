import React from "react";
import InputField from "../../../widgets/Input/input-field/InputField";
import { ApplicationIcon } from "../../../assets/icons/icon";
import "./ApplicationForm.css";
import { CREATE_APPLICATION_FROM_SCHEMA } from "./schema/applicationFormSchema";
import useFormValidation from "../../../features/form-validation/hooks/useFormValidation";

export default function ApplicationForm() {
  const { fieldValues, onChange } = useFormValidation();
  return (
    <div className="application-form-wrapper">
      {CREATE_APPLICATION_FROM_SCHEMA.map((block, blockIndex) => (
        <section className="form-section" key={blockIndex}>
          <div className="form-section-header">
            <ApplicationIcon size={18} className="form-section-icon" />
            <h2 className="form-section-title">{block.blockName}</h2>
          </div>

          <div className="form-section-content">
            {block.blockContent.map((content, rowIndex) => (
              <div key={rowIndex}>
                {content.layout === "split" ? (
                  <div className="field-split">
                    {content.fields.map((field, fieldIndex) => (
                      <div className="field-item" key={fieldIndex}>
                        <InputField
                          id={field.id}
                          label={field.label}
                          value={onChange[field.id]}
                          placeholder={field.placeholder}
                          onChange={onChange}
                          required
                          Icon={ApplicationIcon}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="field-single">
                    {content.fields.map((field, fieldIndex) => (
                      <div className="field-item" key={fieldIndex}>
                        <InputField
                          id={field.id}
                          label={field.label}
                          value={onChange[field.id]}
                          placeholder={field.placeholder}
                          onChange={onChange}
                          required
                          Icon={ApplicationIcon}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
