import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import SecondaryButton from "../../components/SecondaryButton/SecondaryButton";
import ApplicationForm from "./components/ApplicationForm/ApplicationForm";
import { api } from "./services/createApplicationService";
import { subscribeApiState } from "../../lib/api";
import { useToast } from "../../app/context/ToastProvider";
import RightSidebar from "./components/RightSidebar/RightSidebar";
import styles from "./CreateApplication.module.css";
import PageHeader from "../../components/PageHeader/PageHeader";
import Button from "../../components/Button/Button";
import useFormValidation from "../../features/FormValidation/hooks/useFormValidation";
import { normalizeApplicationPayload } from "../../utils/normalization";
import RightPanel from "./components/RightPanel/RightPanel";

export default function CreateApplication() {
  const [loading, setLoading] = useState(false);
  const [selectedResume, setSelectedResume] = useState(null);
  const [selectedCoverLetter, setSelectedCoverLetter] = useState(null);
  const { fieldValues, onChange } = useFormValidation();
  const { addToast } = useToast();

  console.log(fieldValues);

  const context = useOutletContext() || {};
  const { setRightPanelContent, setShowRight } = context;

  useEffect(() => {
    if (setRightPanelContent) {
      setRightPanelContent(
        <RightPanel
          setShowRight={setShowRight}
          selectedResume={selectedResume}
          setSelectedResume={setSelectedResume}
          selectedCoverLetter={selectedCoverLetter}
          setSelectedCoverLetter={setSelectedCoverLetter}
        />,
      );

      setShowRight?.(true);
    }

    return () => {
      if (setRightPanelContent) {
        setRightPanelContent(null);
      }
    };
  }, [setRightPanelContent, setShowRight, selectedResume, selectedCoverLetter]);

  useEffect(() => {
    return subscribeApiState((state) => {
      setLoading(state.loading.create_application || false);
    });
  }, []);

  const handleCreateApplication = async () => {
    try {
      const createApplicationPayload = {
        ...fieldValues,
        resume_document_id: selectedResume,
        cover_letter_document_id: selectedCoverLetter,
      };

      await api.createApplication(
        normalizeApplicationPayload(createApplicationPayload),
      );
    } catch (err) {
      addToast({
        title: "Unable to create application",
        message: err.message,
        type: "error",
      });
    }
  };

  return (
    <div className={styles["create-application-page"]}>
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

      <section className={styles["application-main"]}>
        <section className={styles["application-form-container"]}>
          <ApplicationForm onChange={onChange} fieldValues={fieldValues} />
        </section>
      </section>
    </div>
  );
}
