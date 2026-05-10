import React, { useState } from "react";
import "./BottomDetailPanel.css";
import AvatarLetter from "../../../../widgets/avatar-letter/AvatarLetter";
import Button from "../../../../widgets/gradient-button/Button";
import { DocumentsIcon } from "../../../../assets/icons/icon";
import TabsComponent from "../../../../features/tabs-component/TabsComponent";
import { formatRelativeDate } from "../../../../utils/formatDate";
import ApplicationOverview from "../application-overview/ApplicationOverview";

const APPLICATION_DETAIL_TABS = [
  { id: "overview", label: "Overview", icon: DocumentsIcon },
  { id: "jobdetails", label: "Job Details", icon: DocumentsIcon },
  { id: "documentsused", label: "Documents used", icon: DocumentsIcon },
  { id: "notes", label: "Notes", icon: DocumentsIcon },
];

/*
"public_id": "d7e94533-772b-41cc-b25e-cd45c890888c",
    "company_name": "Google",
    "role_title": "SDE2",
    "department": "Software",
    "location": "Bangalore",
    "work_type": "hybrid",
    "employment_type": "full_time",
    "job_url": "www.google.com",
    "source": "linkedin",
    "status": "interview",
    "priority": "high",
    "salary_min": 1234567,
    "salary_max": 1234567890,
    "bonus": 1234567890,
    "equity": 12345678,
    "currency": "INR",
    "applied_at": "2026-05-28",
    "deadline_at": "2026-05-25",
    "notes": "asdfghjk sdrftgyhjk sdfghjk wertyjk ertyjk ertyui",
    "job_description": "Frontend Engineer (Remote)\n\nFull-time position\n\nReal people. Real service.\n\nAt SupplyHouse.com, we value every 
    "resume_id": null,
    "cover_letter_id": null,
    "created_at": "2026-05-08 20:38:23",
    "updated_at": "2026-05-08 20:38:23"
*/

export default function BottomDetailPanel({ application }) {
  const [activeTab, setActivetab] = useState("overview");
  if (!application) return;

  const handleTabChange = (tab_id) => {
    setActivetab(tab_id);
  };

  const getActiveComponent = (tab) => {
    switch (tab) {
      case "overview":
        return <ApplicationOverview application={application} />;
        break;

      default:
        return <h1>Eror</h1>;
        break;
    }
  };

  console.log(activeTab);
  return (
    <div className="application-detail-panel">
      {/* Header */}
      <div className="detail-header">
        <AvatarLetter name="Senior Product Designer" />
        <div className="detail-title-group">
          <div className="detail-title-row">
            <h2>{application.role_title}</h2>
            <span className="status-badge">INTERVIEW</span>
          </div>

          <p className="detail-subtitle">
            {`${application.company_name} • ${application.location} (${application.work_type})`}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="detail-tabs">
        <TabsComponent
          tabs={APPLICATION_DETAIL_TABS}
          defaultTab="overview"
          onChange={handleTabChange}
        />
      </div>

      {/* Main Grid */}
      <div
        style={{
          height: "200px",
          width: "100%",
          overflowY: "scroll",
        }}
      >
        {getActiveComponent(activeTab)}
      </div>

      {/* Footer */}
      <div className="detail-footer">
        <div className="footer-meta">
          <span>
            Created {formatRelativeDate(application.created_at).relative}
          </span>
          <span>
            Updated {formatRelativeDate(application.updated_at).relative}
          </span>
        </div>

        <div className="footer-actions">
          <Button text="Archive" variant="outline" />
          {/* <Button text="Edit Application" /> */}
        </div>
      </div>
    </div>
  );
}

/*
      <div className="detail-grid">

        <div className="detail-card">
          <div className="card-header">
            <h3>Application Info</h3>
            <button className="ghost-btn">Edit</button>
          </div>

          <div className="info-list">
            <div className="info-row">
              <span className="label">Role</span>
              <span className="value">Senior Product Designer</span>
            </div>

            <div className="info-row">
              <span className="label">Department</span>
              <span className="value">Product Design</span>
            </div>

            <div className="info-row">
              <span className="label">Location</span>

              <div className="value">
                San Francisco, CA (Hybrid)
                <span className="pill">Hybrid</span>
              </div>
            </div>

            <div className="info-row">
              <span className="label">Job URL</span>

              <a href="#" className="job-link">
                https://acme.com/careers/12345
              </a>
            </div>

            <div className="info-row">
              <span className="label">Source</span>
              <span className="value">LinkedIn</span>
            </div>
          </div>
        </div>


        <div className="detail-card">
          <div className="card-header">
            <h3>Compensation & Status</h3>
          </div>

          <div className="info-list">
            <div className="info-row">
              <span className="label">Salary</span>

              <span className="value">$140,000 - $160,000 USD</span>
            </div>

            <div className="info-row">
              <span className="label">Priority</span>

              <span className="value priority-high">High</span>
            </div>

            <div className="info-row">
              <span className="label">Applied Date</span>

              <span className="value">Oct 24, 2023</span>
            </div>

            <div className="info-row">
              <span className="label">Next Step</span>

              <span className="value">Technical Interview</span>
            </div>

            <div className="info-row">
              <span className="label">Deadline</span>

              <span className="value">Nov 10, 2023</span>
            </div>
          </div>
        </div>
      </div>


      <div className="description-card">
        <h3>Job Description Summary</h3>

        <p>
          We are seeking a Senior Product Designer to join our team and lead the
          design of modern, user-centered products. You will collaborate with
          cross-functional teams to define product vision, craft intuitive
          experiences, and drive design excellence.
        </p>

        <div className="tags">
          <span className="tag">Product Design</span>
          <span className="tag">User Experience</span>
          <span className="tag">Figma</span>
          <span className="tag">Design Systems</span>
          <span className="tag">Prototyping</span>
          <span className="tag">User Research</span>
          <span className="tag">Interaction Design</span>
        </div>
      </div>
*/
