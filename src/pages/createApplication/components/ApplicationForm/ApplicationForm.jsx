import React from "react";
import styles from "./ApplicationForm.module.css";
import { CREATE_APPLICATION_FORM_SCHEMA } from "./schemas/applicationFormSchema";
import DynamicFormBlock from "../DynamicFormBlock";
import JobDescriptionBlock from "../JobDescriptionBlock";
import DocumentsMatchingBlock from "../DocumentsPickerBlock/DocumentsPickerBlock";
import OrganizationNotesBlock from "../OrganizationNotesBlock";
import DocumentsPickerBlock from "../DocumentsPickerBlock/DocumentsPickerBlock";

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
    <div className={styles["application-form-wrapper"]}>
      {CREATE_APPLICATION_FORM_SCHEMA.map((section, index) => (
        <section className={styles["form-section"]} key={section.id || index}>
          <div className={styles["form-section-header"]}>
            <h2 className={styles["form-section-title"]}>{section.title}</h2>
          </div>

          <div className={styles["form-section-body"]}>
            {renderSectionContent(section)}
          </div>
        </section>
      ))}
    </div>
  );
}
