import React, { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import type { Habit, EditHabitData } from '../types/Habit';
import { HABIT_COLORS } from '../constants/colors';
import ColorPicker from './ColorPicker';

interface EditHabitModalProps {
  habit: Habit;
  onSave: (editData: EditHabitData) => void;
  onClose: () => void;
}

function EditHabitModal({ habit, onSave, onClose }: EditHabitModalProps) {
  const [name, setName] = useState<string>(habit.name);
  const [selectedColor, setSelectedColor] = useState<string>(habit.color);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    if (name.trim()) {
      onSave({
        id: habit.id,
        name: name.trim(),
        color: selectedColor
      });
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Edit Habit</h2>
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="edit-habit-name" className="form-label">
              Habit Name
            </label>
            <input
              id="edit-habit-name"
              type="text"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={50}
              required
              autoFocus
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Choose Color</label>
            <ColorPicker
              colors={HABIT_COLORS}
              selectedColor={selectedColor}
              onColorSelect={setSelectedColor}
            />
          </div>
          
          <div className="modal-actions">
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={!name.trim()}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditHabitModal;