import React from "react";
import "./CreateApplication.css";
import SecondaryButton from "../../widgets/secondary-button/SecondaryButton";
import GradientButton from "../../widgets/gradient-button/GradientButton";
import ApplicationForm from "../../features/application-form/ApplicationForm";

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
          {/* <div style={{ height: "20px", background: "red" }}></div> */}
          <ApplicationForm />
        </section>
        <section className="application-side-panel">
          {/* <div style={{ height: "20px", background: "red" }}></div> */}
        </section>
      </section>
    </div>
  );
}
