import React from "react";
import InputField from "../../widgets/Input/input-field/InputField";
import { ApplicationIcon } from "../../assets/icons/icon";
import "./ApplicationForm.css";

export default function ApplicationForm() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      {/* core details */}
      <section className="form-section">
        <div className="form-section-header">
          <ApplicationIcon size={18} className="form-section-icon" />
          <h2 className="form-section-title">Core Details</h2>
        </div>

        <section className="form-section-content">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <InputField
              label="Company name"
              placeholder="e.g. Google"
              required
              Icon={ApplicationIcon}
            />

            <InputField
              label="Role"
              placeholder="e.g. Google"
              required
              Icon={ApplicationIcon}
            />
          </div>

          <div>
            <InputField
              label="JOB URL"
              placeholder="https://"
              Icon={ApplicationIcon}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <InputField
              label="DEPARTMENT"
              placeholder="e.g. Design"
              Icon={ApplicationIcon}
            />

            <InputField
              label="LOCATION"
              placeholder="e.g. Remote,NY"
              Icon={ApplicationIcon}
            />
          </div>
        </section>
      </section>

      {/* additional details */}
      <section className="form-section">
        <div className="form-section-header">
          <ApplicationIcon size={18} className="form-section-icon" />
          <h2 className="form-section-title">Additional Details</h2>
        </div>

        <section className="form-section-content">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <InputField
              label="Company name"
              placeholder="e.g. Google"
              required
              Icon={ApplicationIcon}
            />

            <InputField
              label="Role"
              placeholder="e.g. Google"
              required
              Icon={ApplicationIcon}
            />
          </div>

          <div>
            <InputField
              label="JOB URL"
              placeholder="https://"
              Icon={ApplicationIcon}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <InputField
              label="DEPARTMENT"
              placeholder="e.g. Design"
              Icon={ApplicationIcon}
            />

            <InputField
              label="LOCATION"
              placeholder="e.g. Remote,NY"
              Icon={ApplicationIcon}
            />
          </div>
        </section>
      </section>
    </div>
  );
}
