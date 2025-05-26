import React from 'react';
import type { Habit, DayOfWeek } from '../types/Habit';
import HabitCard from './HabitCard';

interface HabitsListProps {
  habits: Habit[];
  onToggleDay: (habitId: string, day: DayOfWeek) => void;
  onEditHabit: (habit: Habit) => void;
  onDeleteHabit: (habitId: string) => void;
}

function HabitsList({ habits, onToggleDay, onEditHabit, onDeleteHabit }: HabitsListProps) {
  if (habits.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-content">
          <h3>No habits found</h3>
          <p>Start building better habits by adding your first habit above!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="habits-list">
      <div className="habits-grid">
        {habits.map((habit) => (
          <HabitCard
            key={habit.id}
            habit={habit}
            onToggleDay={onToggleDay}
            onEdit={onEditHabit}
            onDelete={onDeleteHabit}
          />
        ))}
      </div>
    </div>
  );
}

export default HabitsList;