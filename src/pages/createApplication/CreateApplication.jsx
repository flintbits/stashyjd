import React, { useEffect, useState } from "react";
import "./CreateApplication.css";
import SecondaryButton from "../../widgets/secondary-button/SecondaryButton";
import GradientButton from "../../widgets/gradient-button/GradientButton";
import ApplicationForm from "./application-form/ApplicationForm";
import { api } from "./services/createApplicationService";
import { subscribeApiState } from "../../lib/api";

export default function CreateApplication() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return subscribeApiState((state) => {
      setLoading(state.loading.create_application || false);
    });
  }, []);

  const handleCreateApplication = async () => {
    try {
      await api.createApplication({
        companyName: "OpenAI",
        roleTitle: "Frontend Engineer",
        location: "Remote",
        jobUrl: "https://jobs.openai.com",
      });
    } catch (err) {
      alert(err.message);
    }
  };

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
          <GradientButton
            text="Create Application"
            onClick={handleCreateApplication}
            loading={loading}
          />
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
