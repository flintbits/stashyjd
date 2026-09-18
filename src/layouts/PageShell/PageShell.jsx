import styles from './PageShell.module.css';

export default function PageShell({ children, className = '', scrollable = false }) {
  const shellClassName = [styles['page-shell'], scrollable ? styles.scrollable : '', className]
    .filter(Boolean)
    .join(' ');

  return <div className={shellClassName}>{children}</div>;
}
