export const CREATE_APPLICATION_FROM_SCHEMA = [
  {
    blockName: "Company details",
    blockContent: [
      {
        layout: "split",
        fields: [
          {
            id: "company_name",
            label: "Company Name",
            type: "text",
            placeholder: "e.g. Google",
          },
          {
            id: "role_title",
            label: "Role Title",
            type: "text",
            placeholder: "e.g. Senior Product Designer",
          },
        ],
      },
      {
        layout: "single",
        fields: [
          {
            id: "job_url",
            label: "Job URL",
            type: "text",
            placeholder: "https://",
          },
        ],
      },
      {
        layout: "split",
        fields: [
          {
            id: "department",
            label: "Department",
            type: "text",
            placeholder: "e.g. Design",
          },
          {
            id: "location",
            label: "Location",
            type: "text",
            placeholder: "e.g. Bangalore, India",
          },
        ],
      },
    ],
  },

  {
    blockName: "Additional details",
    blockContent: [
      {
        layout: "split",
        fields: [
          {
            id: "salary_min",
            label: "Salary Range Min",
            type: "text",
            placeholder: "10000",
          },
          {
            id: "salary_max",
            label: "Salary Range Max",
            type: "text",
            placeholder: "20000",
          },
        ],
      },

      {
        layout: "split",
        fields: [
          {
            id: "stage",
            label: "Stage",
            type: "text",
            placeholder: "Applied",
          },
          {
            id: "priority",
            label: "Priority",
            type: "text",
            placeholder: "High",
          },
        ],
      },

      {
        layout: "split",
        fields: [
          {
            id: "ectc",
            label: "Expected CTC",
            type: "text",
            placeholder: "20000",
          },
          {
            id: "currency",
            label: "Currency",
            type: "text",
            placeholder: "USD",
          },
        ],
      },
      {
        layout: "single",
        fields: [
          {
            id: "source",
            label: "Source",
            type: "text",
            placeholder: "LinkedIn",
          },
        ],
      },
    ],
  },

  {
    blockName: "Dates & Notes",
    blockContent: [
      {
        layout: "split",
        fields: [
          {
            id: "applied_at",
            label: "Applied At",
            type: "text",
            placeholder: "YYYY-MM-DD",
          },
          {
            id: "deadline_at",
            label: "Deadline At",
            type: "text",
            placeholder: "YYYY-MM-DD",
          },
        ],
      },

      {
        layout: "single",
        fields: [
          {
            id: "notes",
            label: "Notes",
            type: "text",
            placeholder: "Add notes about this application",
          },
        ],
      },
    ],
  },

  {
    blockName: "Documents",
    blockContent: [
      {
        layout: "single",
        fields: [
          {
            id: "resume_id",
            label: "Resume ID",
            type: "text",
            placeholder: "resume_001",
          },
        ],
      },
      {
        layout: "single",
        fields: [
          {
            id: "cover_letter_id",
            label: "Cover Letter ID",
            type: "text",
            placeholder: "cover_letter_001",
          },
        ],
      },
    ],
  },
];

//   { id: "stage" },
//   { id: "priority" },
//   { id: "source" },
//   { id: "salary_min" },
//   { id: "salary_max" },
//   { id: "currency" },
//   { id: "applied_at" },
//   { id: "deadline_at" },
//   { id: "notes" },
//   { id: "resume_id" },
//   { id: "cover_letter_id" },
