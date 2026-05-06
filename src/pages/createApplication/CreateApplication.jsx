import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import SecondaryButton from "../../widgets/secondary-button/SecondaryButton";
import ApplicationForm from "./application-form/ApplicationForm";
import { api } from "./services/createApplicationService";
import { subscribeApiState } from "../../lib/api";
import { useToast } from "../../app/context/ToastProvider";
import RightSidebar from "./components/RightSidebar";
import "./CreateApplication.css";
import PageHeader from "../../widgets/page-header/PageHeader";
import Button from "../../widgets/gradient-button/Button";

export default function CreateApplication() {
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  // Use outlet context to control the global right panel
  const context = useOutletContext() || {};
  const { setRightPanelContent, setShowRight } = context;

  useEffect(() => {
    // Render custom RightSidebar into the global right panel when this page mounts
    if (setRightPanelContent) {
      setRightPanelContent(<RightSidebar setShowRight={setShowRight} />);
      setShowRight?.(true); // Ensure it's visible
    }

    // Cleanup when leaving the page
    return () => {
      if (setRightPanelContent) {
        setRightPanelContent(null);
      }
    };
  }, [setRightPanelContent, setShowRight]);

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
      addToast({
        title: "Unable to create application",
        message: err.message,
        type: "error",
      });
    }
  };

  return (
    <div className="create-application-page">
      <PageHeader
        title="New Application"
        subtitle=" Add job details manually or paste a job description to enrich your
          application."
      >
        <Button
          text="Create Application"
          onClick={handleCreateApplication}
          loading={loading}
        />
      </PageHeader>

      <section className="application-main">
        <section className="application-form-container">
          <ApplicationForm />
        </section>
      </section>
    </div>
  );
}
