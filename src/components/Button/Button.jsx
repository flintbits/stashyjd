import styles from './Button.module.css';

export default function Button({
  text = '',
  onClick,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  loading = false,
  variant = 'primary',
  disabled = false,
  iconOnly = false,
  type = 'button',
  className = '',
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.btn} ${styles[`btn-${variant}`]} ${iconOnly ? styles['icon-only'] : ''} ${className}`}
      disabled={loading || disabled}
    >
      <span className={`${styles['btn-content']} ${loading ? styles['is-hidden'] : ''}`}>
        {LeftIcon && (
          <span className={`${styles['btn-icon']} ${styles['btn-icon-left']}`}>
            <LeftIcon />
          </span>
        )}

        <span className={styles['btn-label']}>{text}</span>

        {RightIcon && (
          <span className={`${styles['btn-icon']} ${styles['btn-icon-right']}`}>
            <RightIcon />
          </span>
        )}
      </span>

      {loading && (
        <span className={styles['btn-spinner-overlay']}>
          <span className={styles['btn-spinner']}></span>
        </span>
      )}
    </button>
  );
}
