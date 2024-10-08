import { useState } from 'react';
import './Note.css'

export const Note = ({ note, onChangeNote, onClickNote }) => {
  const [formValues, setFormValues] = useState(note);

  function onArchiveChange(e) {
    e.stopPropagation();
    const newNote = { ...formValues, archived: e.target.checked };
    setFormValues(newNote);
    onChangeNote(newNote);
  }

  return (
    <div className="noteContainer" onClick={() => {onClickNote(note)}}>
      <label className="containerCheckbox" onClick={(e) => e.stopPropagation()}>
        <input
          type="checkbox"
          id={formValues.id + ""}
          checked={formValues.archived ?? false}
          value={formValues.archived ?? false}
          onChange={onArchiveChange}
        />
        <svg viewBox="0 0 64 64" height="0.8em" width="0.8em">
          <path
            d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
            pathLength="575.0541381835938"
            className="path"></path>
        </svg>
      </label>
      <div className="noteElement noteLabel">{formValues.name}</div>
    </div>
  );
};


