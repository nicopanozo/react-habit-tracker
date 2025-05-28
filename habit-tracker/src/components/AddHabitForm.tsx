import React, { useState } from 'react';
import type { FormEvent } from 'react';
import type { HabitFormData } from '../types/Habit';
import { HABIT_COLORS } from '../constants/colors';
import ColorPicker from './ColorPicker';
import '../styles/components/AddHabitForm.css';
import '../styles/components/Button.css';

interface AddHabitFormProps {
  onAddHabit: (habitData: HabitFormData) => void;
}

function AddHabitForm({ onAddHabit }: AddHabitFormProps) {
  const [name, setName] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>(HABIT_COLORS[0]);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    if (name.trim()) {
      onAddHabit({
        name: name.trim(),
        color: selectedColor
      });
      
      setName('');
      setSelectedColor(HABIT_COLORS[0]);
      setIsExpanded(false);
    }
  };

  return (
    <div className="add-habit-section">
      <div className="add-habit-header">
        <h2>Add New Habit</h2>
        <button
          className="expand-toggle"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label={isExpanded ? 'Collapse form' : 'Expand form'}
        >
          {isExpanded ? '−' : '+'}
        </button>
      </div>
      
      {isExpanded && (
        <form className="add-habit-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="habit-name" className="form-label">
              Habit Name
            </label>
            <input
              id="habit-name"
              type="text"
              className="form-input"
              placeholder="Enter habit name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={50}
              required
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
          
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={!name.trim()}
          >
            Add Habit
          </button>
        </form>
      )}
    </div>
  );
}

export default AddHabitForm;