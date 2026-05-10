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
import useFormValidation from "../../features/form-validation/hooks/useFormValidation";
import { normalizeApplicationPayload } from "../../utils/normalization";

export default function CreateApplication() {
  const [loading, setLoading] = useState(false);
  const { fieldValues, onChange } = useFormValidation();
  const { addToast } = useToast();

  console.log(fieldValues);

  const context = useOutletContext() || {};
  const { setRightPanelContent, setShowRight } = context;

  useEffect(() => {
    if (setRightPanelContent) {
      setRightPanelContent(<RightSidebar setShowRight={setShowRight} />);
      setShowRight?.(true);
    }

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
      await api.createApplication(normalizeApplicationPayload(fieldValues));
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
          <ApplicationForm onChange={onChange} fieldValues={fieldValues} />
        </section>
      </section>
    </div>
  );
}
