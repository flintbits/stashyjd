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
    setIsAdding(true);
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

        {!isAdding && (
          <Button text={buttonLabel} variant="neutral" onClick={handleOpenAdd} leftIcon={AddIcon} />
        )}
      </div>

      <div className={`${styles.addNote} ${isAdding ? styles.addNoteOpen : ''}`}>
        <div className={styles.addNoteInner}>
          <TextArea
            placeholder="Bla bla bla"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
          />
          <div className={styles.addNoteActions}>
            <Button text="Add" onClick={handleAdd} />{' '}
            <Button
              // text="Delete Document"
              variant="danger"
              leftIcon={FiX}
              onClick={handleCancelAdd}
              aria-label="Cancel adding note"
            />
          </div>
        </div>
      </div>

      <div className={styles.list}>
        {items.map((item) => (
          <div className={`${styles.item} ${!showCheckbox ? styles.noCheckbox : ''}`} key={item.id}>
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

              {/* <button
                type="button"
                className={styles.deleteButton}
                onClick={() => onDelete?.(item)}
                aria-label={`Delete "${item.title}"`}
              >
                <FiTrash2 />
              </button> */}

              <Button
                // text="Delete Document"
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
