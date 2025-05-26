import React from 'react';
import type { Theme } from '../types/Habit';

interface HeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
  onResetProgress: () => void;
  totalHabits: number;
  completedHabits: number;
}

function Header({ theme, onToggleTheme, onResetProgress, totalHabits, completedHabits }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="app-title">Habit Tracker</h1>
          <div className="header-stats">
            <span className="stat">
              {completedHabits}/{totalHabits} habits completed this week
            </span>
          </div>
        </div>
        
        <div className="header-actions">
          <button
            className="btn btn-secondary"
            onClick={onResetProgress}
            disabled={totalHabits === 0}
          >
            Reset Progress
          </button>
          
          <button
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;