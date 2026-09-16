import { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { AddIcon, DeleteIcon } from '../../../../assets/icons/icon';
import Button from '../../../../components/Button/Button';
import styles from './TaskList.module.css';
import TextArea from '../../../../components/Input/TextArea/TextArea';

export default function TaskList({
  title = 'Next Steps',
  items = [],
  buttonLabel = 'Add Step',
  showCheckbox = true,
  onAdd,
  onToggle,
  onDelete,
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [note, setNote] = useState('');

  const handleOpenAdd = () => {
    setIsAdding((prev) => !prev);
  };

  const handleCancelAdd = () => {
    setIsAdding(false);
    setNote('');
  };

  const handleAdd = () => {
    const value = note.trim();
    if (!value) return;
    onAdd(value);
    setNote('');
    setIsAdding(false);
  };

  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <h3>{title}</h3>

        <Button
          text={`${!isAdding ? buttonLabel : 'Close'}`}
          variant={`${!isAdding ? 'neutral' : 'danger'}`}
          onClick={handleOpenAdd}
          leftIcon={!isAdding ? AddIcon : FiX}
        />
      </div>

      <div className={`${styles.addNote} ${isAdding ? styles.addNoteOpen : ''}`}>
        <div className={styles.addNoteInner}>
          <TextArea value={note} onChange={(e) => setNote(e.target.value)} rows={2} />
          <div className={styles.addNoteActions}>
            <Button text={buttonLabel} variant="text" onClick={handleAdd} />
          </div>
        </div>
      </div>

      <div className={styles.list}>
        {items &&
          items?.map((item) => (
            <div
              className={`${styles.item} ${!showCheckbox ? styles.noCheckbox : ''}`}
              key={item.id}
            >
              {showCheckbox && (
                <button
                  type="button"
                  className={`${styles.checkbox} ${item.completed ? styles.checked : ''}`}
                  onClick={() => onToggle?.(item)}
                  aria-label={`Mark "${item.title}" as ${item.completed ? 'incomplete' : 'complete'}`}
                >
                  {item.completed && '✓'}
                </button>
              )}

              <div className={styles.content}>
                <div className={`${styles.itemText} ${item.completed ? styles.completed : ''}`}>
                  {item.text}
                </div>
              </div>

              <div className={styles.itemActions}>
                {item.date && (
                  <span className={`${styles.date} ${item.overdue ? styles.overdue : ''}`}>
                    {item.date}
                  </span>
                )}

                <Button
                  variant="danger"
                  leftIcon={DeleteIcon}
                  onClick={() => onDelete?.(item)}
                  aria-label={`Delete "${item.title}"`}
                />
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
