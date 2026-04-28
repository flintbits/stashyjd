import React, { useState } from "react";

export default function useFormValidation() {
  const [fieldValues, setFieldValues] = useState({});

  const onChange = (e) => {
    const fieldId = e.target.id;
    const fieldval = e.target.value;
    setFieldValues((prev) => ({ ...prev, fieldId: fieldval }));
  };

  return { fieldValues, onChange };
}
