import React, { useState } from 'react';
import type { Habit } from '../types/Habit';
import type { DayOfWeek } from '../types/Habit';
import {
  DAYS_OF_WEEK,
  DAYS_DISPLAY_NAMES,
  getCompletedDaysCount,
  getCompletionPercentage,
  isHabitCompleted,
  calculateStreak,
} from '../utils/habitUtils';
import ProgressBar from './ProgressBar';
import '../styles/components/HabitCard.css';
import '../styles/components/Button.css';

interface HabitCardProps {
  habit: Habit;
  onToggleDay: (habitId: string, day: DayOfWeek) => void;
  onEdit: (habit: Habit) => void;
  onDelete: (habitId: string) => void;
}

function HabitCard({ habit, onToggleDay, onEdit, onDelete }: HabitCardProps) {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const completedDaysCount = getCompletedDaysCount(habit);
  const completionPercentage = getCompletionPercentage(habit);
  const isCompleted = isHabitCompleted(habit);
  const streak = calculateStreak(habit);

  return (
    <div
      className="habit-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ '--habit-color': habit.color } as React.CSSProperties}
    >
      <div className="habit-header">
        <div className="habit-title">
          <h3 className="habit-name">
            {habit.name}
            {isCompleted && <span className="completion-badge">✓</span>}
          </h3>
          <div className="habit-stats">
            <span className="completion-text">{completedDaysCount}/7 days</span>
            {streak > 0 && (
              <span className="streak-badge">{streak} day streak</span>
            )}
          </div>
        </div>

        <div className="habit-actions">
          <button
            className="btn btn-small btn-secondary"
            onClick={() => onEdit(habit)}
          >
            Edit
          </button>
          {isHovered && (
            <button
              className="btn btn-small btn-danger"
              onClick={() => onDelete(habit.id)}
            >
              Delete
            </button>
          )}
        </div>
      </div>

      <div className="progress-section">
        <ProgressBar percentage={completionPercentage} color={habit.color} />
      </div>

      <div className="days-container">
        <div className="days-grid">
          {DAYS_OF_WEEK.map(day => (
            <div key={day} className="day-item">
              <label className="day-label">{DAYS_DISPLAY_NAMES[day]}</label>
              <button
                className={`day-checkbox ${habit.completedDays[day] ? 'checked' : ''}`}
                onClick={() => onToggleDay(habit.id, day)}
                aria-label={`Mark ${DAYS_DISPLAY_NAMES[day]} as ${habit.completedDays[day] ? 'incomplete' : 'complete'}`}
              >
                {habit.completedDays[day] && (
                  <span className="checkmark">✓</span>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HabitCard;
