import React from "react";
import "./ApplicationForm.css";
import { CREATE_APPLICATION_FORM_SCHEMA } from "./schema/applicationFormSchema";
import DynamicFormBlock from "../components/DynamicFormBlock";
import JobDescriptionBlock from "../components/JobDescriptionBlock";
import DocumentsMatchingBlock from "../components/document-picker-block/DocumentsPickerBlock";
import OrganizationNotesBlock from "../components/OrganizationNotesBlock";
import DocumentsPickerBlock from "../components/document-picker-block/DocumentsPickerBlock";

export default function ApplicationForm({ onChange, fieldValues }) {
  const renderSectionContent = (section) => {
    switch (section.type) {
      case "dynamic":
        return (
          <DynamicFormBlock
            section={section}
            values={fieldValues}
            onChange={onChange}
          />
        );
      case "custom_job_description":
        return <JobDescriptionBlock values={fieldValues} onChange={onChange} />;
      case "custom_documents_matching":
        return (
          <DocumentsPickerBlock values={fieldValues} onChange={onChange} />
        );
      case "custom_organization_notes":
        return (
          <OrganizationNotesBlock values={fieldValues} onChange={onChange} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="application-form-wrapper">
      {CREATE_APPLICATION_FORM_SCHEMA.map((section, index) => (
        <section className="form-section" key={section.id || index}>
          <div className="form-section-header">
            <h2 className="form-section-title">{section.title}</h2>
          </div>

          <div className="form-section-body">
            {renderSectionContent(section)}
          </div>
        </section>
      ))}
    </div>
  );
}
