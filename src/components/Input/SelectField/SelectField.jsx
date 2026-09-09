import React from 'react';
import { SelectArrowIcon } from '../../../assets/icons/icon';
import styles from './SelectField.module.css';

const SelectField = ({
  id,
  label,
  required = false,
  options = [],
  value,
  onChange,
  placeholder,
  error = '',
}) => {
  return (
    <div className={`${styles['select-field']} ${error ? styles['has-error'] : ''}`}>
      {label && (
        <label htmlFor={id} className={styles['select-label']}>
          {label} {required && <span>*</span>}
        </label>
      )}

      <div className={styles['select-wrapper']}>
        <select
          id={id}
          value={value}
          onChange={onChange}
          className={`${styles['select-control']} ${!value ? styles['is-placeholder'] : ''}`}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className={styles['select-arrow']}>
          <SelectArrowIcon size={16} strokeWidth={2} aria-hidden="true" />
        </div>
      </div>

      {error && <p className={styles['select-error']}>{error}</p>}
    </div>
  );
};

export default SelectField;
