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
import { normalizeApplicationPayload } from "../../utils/normalization";
import useFormValidation from "../../app/hooks/useFormValidation";
import RightPanel from "./components/CARightPanel/CARightPanel";

export default function CreateApplication({ rightPanelWidth = 320 }) {
  const [loading, setLoading] = useState(false);
  const [selectedResume, setSelectedResume] = useState(null);
  const [selectedCoverLetter, setSelectedCoverLetter] = useState(null);
  const { fieldValues, onChange, setFieldValues } = useFormValidation();
  const { addToast } = useToast();

  //TODO: Delete this later
  const handleFillFields = () => {
    setFieldValues({
      company_name: "Google",
      role_title: "Data Center Technician",
      employment_type: "full_time",
      work_type: "onsite",
      job_url:
        "https://www.google.com/about/careers/applications/jobs/results/107686025534284486-data-center-technician-server-operations",
      location: "Mumbai, Maharashtra, India",
      department: "Server Operations",
      currency: "INR",
      minsalary: "5000000",
      maxsalary: "5000000",
      equity: "5000000",
      bonus: "5000000",
      source: "company_site",
      priority: "Low",
      status: "applied",
      applied_date: "2026-09-06",
      deadline_date: "2026-09-09",
      job_description:
        "Minimum qualifications:\n\n    Experience with assembly of mechanical or electrical systems, or performing component-level repairs and troubleshooting on technical equipment.\n    Experience with diagnosing and troubleshooting operating systems, computer hardware and server hardware.\n    Experience with networking protocols.\n    Ability to lift/move 50lb (23kg) of equipment and ability to exert yourself physically over extended periods of time, including frequent bending, kneeling, climbing, pushing/pulling and lifting.\n    Ability to work non-standard hours, including working weekends, night shifts, holidays and on shift-based schedules as required.\n\n\nPreferred qualifications:\n\n    4 years of experience in maintenance and monitoring of server systems.\n    Experience with performing component-level repairs and troubleshooting on IT equipment or in a related role (e.g., Systems Administration, Network Deployment Engineer, Help Desk Technician, etc.).\n    Experience working within a data center or network operation center environment.\n    Experience with Linux operating systems.\n    Experience in project management and leadership, and collaborating and partnering with teams.\n",
    });
  };

  const context = useOutletContext() || {};
  const { setRightPanelContent, setShowRight } = context;

  useEffect(() => {
    context.setRightPanelWidth?.(rightPanelWidth);

    return () => {
      context.setRightPanelWidth?.(320);
    };
  }, [context.setRightPanelWidth, rightPanelWidth]);

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

      const response = await api.createApplication(
        normalizeApplicationPayload(createApplicationPayload),
      );

      addToast({
        title: response.status,
        message: response.message,
        type: response.status === "success" ? "success" : "warning",
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
        <Button
          text="Fill All the fields"
          onClick={handleFillFields}
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

/*

{
    "company_name": "Google",
    "role_title": "Data Center Technician",
    "employment_type": "full_time",
    "work_type": "onsite",
    "job_url": "https://www.google.com/about/careers/applications/jobs/results/107686025534284486-data-center-technician-server-operations",
    "location": "Mumbai, Maharashtra, India",
    "department": "Server Operations",
    "currency": "INR",
    "minsalary": "5000000",
    "maxsalary": "5000000",
    "equity": "5000000",
    "bonus": "5000000",
    "source": "company_site",
    "priority": "Low",
    "status": "applied",
    "applied_date": "2026-09-06",
    "deadline_date": "2026-09-09",
    "job_description": "Minimum qualifications:\n\n    Experience with assembly of mechanical or electrical systems, or performing component-level repairs and troubleshooting on technical equipment.\n    Experience with diagnosing and troubleshooting operating systems, computer hardware and server hardware.\n    Experience with networking protocols.\n    Ability to lift/move 50lb (23kg) of equipment and ability to exert yourself physically over extended periods of time, including frequent bending, kneeling, climbing, pushing/pulling and lifting.\n    Ability to work non-standard hours, including working weekends, night shifts, holidays and on shift-based schedules as required.\n\n\nPreferred qualifications:\n\n    4 years of experience in maintenance and monitoring of server systems.\n    Experience with performing component-level repairs and troubleshooting on IT equipment or in a related role (e.g., Systems Administration, Network Deployment Engineer, Help Desk Technician, etc.).\n    Experience working within a data center or network operation center environment.\n    Experience with Linux operating systems.\n    Experience in project management and leadership, and collaborating and partnering with teams.\n"
}


*/
