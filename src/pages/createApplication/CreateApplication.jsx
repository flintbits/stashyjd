import React from "react";
import "./CreateApplication.css";
import SecondaryButton from "../../widgets/Secondary Button/SecondaryButton";
import GradientButton from "../../widgets/Gradient Button/GradientButton";
import ApplicationForm from "../../features/applicationForm/ApplicationForm";

export default function CreateApplication() {
  return (
    <div>
      <section className="application-header">
        <div className="application-header-content">
          <h1 className="application-header-title">New Application</h1>
          <p className="application-header-subtitle">
            Record a new job opportunity to your pipeline.
          </p>
        </div>

        <div className="application-header-actions">
          <SecondaryButton text="Cancel" />
          <SecondaryButton text="Save Draft" />
          <GradientButton text="Create Application" />
        </div>
      </section>

      <section className="application-main">
        <section className="application-form-container">
          <ApplicationForm />
        </section>
        <section className="application-side-panel"></section>
      </section>
    </div>
  );
}
