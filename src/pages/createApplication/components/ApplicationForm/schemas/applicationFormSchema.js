export const CREATE_APPLICATION_FORM_SCHEMA = [
  {
    id: 'core_job_info',
    title: 'Core Job Information',
    stepNumber: '1',
    type: 'dynamic',
    rows: [
      {
        layout: 'split',
        fields: [
          {
            id: 'company_name',
            label: 'Company Name',
            type: 'text',
            placeholder: 'Acme Corporation',
            required: true,
          },
          {
            id: 'role_title',
            label: 'Role Title',
            type: 'text',
            placeholder: 'Senior Product Designer',
            required: true,
          },
        ],
      },
      {
        layout: 'split',
        fields: [
          {
            id: 'work_type',
            label: 'Work Type',
            type: 'select',
            options: [
              { label: 'Remote', value: 'remote' },
              { label: 'Hybrid', value: 'hybrid' },
              { label: 'On-site', value: 'onsite' },
              { label: 'Flexible', value: 'flexible' },
            ],
            placeholder: 'Select Work Type',
          },
          {
            id: 'employment_type',
            label: 'Employment Type',
            type: 'select',
            options: [
              { label: 'Full-time', value: 'full_time' },
              { label: 'Part-time', value: 'part_time' },
              { label: 'Contract', value: 'contract' },
              { label: 'Freelance', value: 'freelance' },
              { label: 'Internship', value: 'internship' },
              { label: 'Temporary', value: 'temporary' },
              { label: 'Apprenticeship', value: 'apprenticeship' },
            ],
            placeholder: 'Select Employment Type',
          },
        ],
      },
      {
        layout: 'single',
        fields: [
          {
            id: 'job_url',
            label: 'Job URL',
            type: 'url',
            placeholder: 'https://linkedin.com/jobs/view/1234567890',
          },
        ],
      },
      {
        layout: 'single',
        fields: [
          {
            id: 'location',
            label: 'Location',
            type: 'text',
            placeholder: 'New York, NY, USA',
          },
        ],
      },
    ],
  },
  {
    id: 'job_description',
    title: 'Job Description',
    stepNumber: '2',
    type: 'custom_job_description',
  },
];
