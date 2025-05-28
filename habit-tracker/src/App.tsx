import React, { useState, useEffect } from 'react';
import type { Habit, HabitFormData, EditHabitData, FilterType, SortType, Theme, DayOfWeek } from './types/Habit';
import { generateId, saveHabitsToStorage, loadHabitsFromStorage, createEmptyHabitDays, calculateStreak } from './utils/habitUtils';
import Header from './components/Header';
import AddHabitForm from './components/AddHabitForm';
import HabitsFilter from './components/HabitsFilter';
import HabitsList from './components/HabitsList';
import EditHabitModal from './components/EditHabitModal';
import './App.css';
import './styles/components/Button.css';
import './styles/components/Modal.css';


function App() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [habitsLoaded, setHabitsLoaded] = useState(false);
  const [filter, setFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('created');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [theme, setTheme] = useState<Theme>('light');
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    const savedHabits = loadHabitsFromStorage();
    setHabits(savedHabits);
    setHabitsLoaded(true);
  }, []);

  useEffect(() => {
    if (habitsLoaded) {
      saveHabitsToStorage(habits);
    }
  }, [habits, habitsLoaded]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const addHabit = (habitData: HabitFormData): void => {
    const newHabit: Habit = {
      id: generateId(),
      name: habitData.name,
      color: habitData.color,
      completedDays: createEmptyHabitDays(),
      createdAt: new Date().toISOString()
    };
    setHabits(prev => [...prev, newHabit]);
  };

  const updateHabit = (editData: EditHabitData): void => {
    setHabits(prev => prev.map(habit => 
      habit.id === editData.id 
        ? { ...habit, name: editData.name, color: editData.color }
        : habit
    ));
    setEditingHabit(null);
  };

  const deleteHabit = (habitId: string): void => {
    setHabits(prev => prev.filter(habit => habit.id !== habitId));
    setShowDeleteConfirm(null);
  };

  const toggleHabitDay = (habitId: string, day: DayOfWeek): void => {
    setHabits(prev => prev.map(habit => 
      habit.id === habitId 
        ? { 
            ...habit, 
            completedDays: { 
              ...habit.completedDays, 
              [day]: !habit.completedDays[day] 
            } 
          }
        : habit
    ));
  };

  const resetAllProgress = (): void => {
    setHabits(prev => prev.map(habit => ({
      ...habit,
      completedDays: createEmptyHabitDays()
    })));
  };

  const toggleTheme = (): void => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const filteredAndSortedHabits = habits
    .filter(habit => {
      const matchesSearch = habit.name.toLowerCase().includes(searchTerm.toLowerCase());
      const completedDaysCount = Object.values(habit.completedDays).filter(Boolean).length;
      
      switch (filter) {
        case 'completed':
          return matchesSearch && completedDaysCount === 7;
        case 'incomplete':
          return matchesSearch && completedDaysCount < 7;
        default:
          return matchesSearch;
      }
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'streak':
          return calculateStreak(b) - calculateStreak(a);
        case 'created':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  return (
    <div className="app">
      <Header 
        theme={theme}
        onToggleTheme={toggleTheme}
        onResetProgress={resetAllProgress}
        totalHabits={habits.length}
        completedHabits={habits.filter(h => Object.values(h.completedDays).filter(Boolean).length === 7).length}
      />
      
      <main className="main-content">
        <AddHabitForm onAddHabit={addHabit} />
        
        <HabitsFilter
          filter={filter}
          onFilterChange={setFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        
        <HabitsList
          habits={filteredAndSortedHabits}
          onToggleDay={toggleHabitDay}
          onEditHabit={setEditingHabit}
          onDeleteHabit={setShowDeleteConfirm}
        />
      </main>

      {editingHabit && (
        <EditHabitModal
          habit={editingHabit}
          onSave={updateHabit}
          onClose={() => setEditingHabit(null)}
        />
      )}

      {showDeleteConfirm && (
        <div className="modal-overlay">
          <div className="delete-confirm-modal">
            <h3>Delete Habit</h3>
            <p>Are you sure you want to delete this habit? This action cannot be undone.</p>
            <div className="modal-actions">
              <button 
                className="btn btn-secondary"
                onClick={() => setShowDeleteConfirm(null)}
              >
                Cancel
              </button>
              <button 
                className="btn btn-danger"
                onClick={() => deleteHabit(showDeleteConfirm)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;