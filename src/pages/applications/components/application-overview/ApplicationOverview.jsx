import React from "react";
import "./ApplicationOverview.css";
import { formatRelativeDate } from "../../../../utils/formatDate";

export default function ({ application }) {
  return (
    <div className="detail-grid">
      <div className="detail-card">
        <div className="card-header">
          <h3>Application Info</h3>
        </div>

        <div className="info-list">
          <div className="info-row">
            <span className="label">Role</span>
            <span className="value">{application.role_title}</span>
          </div>

          {application.department && (
            <div className="info-row">
              <span className="label">Department</span>
              <span className="value">{application.department}</span>
            </div>
          )}

          <div className="info-row">
            <span className="label">Location</span>

            <div className="value">
              {`${application.location} (${application.work_type})`}
            </div>
          </div>

          <div className="info-row">
            <span className="label">Job URL</span>
            <a href="#" className="job-link">
              {application.job_url}
            </a>
          </div>

          <div className="info-row">
            <span className="label">Source</span>
            <span className="value">{application.source}</span>
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

            <span className="value">
              {`${application.salary_min} - ${application.salary_max} ${application.currency}`}
            </span>
          </div>

          <div className="info-row">
            <span className="label">Priority</span>

            <span className="value priority-high">{application.priority}</span>
          </div>

          <div className="info-row">
            <span className="label">Applied Date</span>

            <span className="value">
              {formatRelativeDate(application.created_at).relative}
            </span>
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
  );
}
