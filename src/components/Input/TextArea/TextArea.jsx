import styles from './TextArea.module.css';

const TextArea = ({
  id,
  label,
  required = false,
  placeholder,
  value,
  onChange,
  error = '',
  rows = 4,
  maxLength,
  className = '',
}) => {
  return (
    <div className={`${styles['textarea-field']} ${className} ${error ? styles['has-error'] : ''}`}>
      {label && (
        <label htmlFor={id} className={styles['textarea-label']}>
          {label} {required && <span>*</span>}
        </label>
      )}

      <div className={styles['textarea-wrapper']}>
        <textarea
          id={id}
          name={label}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          maxLength={maxLength}
          className={styles['textarea-control']}
        />
      </div>

      {error && <p className={styles['textarea-error']}>{error}</p>}
    </div>
  );
};

export default TextArea;
