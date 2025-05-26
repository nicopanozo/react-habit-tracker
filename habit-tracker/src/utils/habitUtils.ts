import type { Habit } from '../types/Habit';
import type { DayOfWeek } from '../types/Habit';

export const DAYS_OF_WEEK: DayOfWeek[] = [
  'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
];

export const DAYS_DISPLAY_NAMES: Record<DayOfWeek, string> = {
  monday: 'Mon',
  tuesday: 'Tue',
  wednesday: 'Wed',
  thursday: 'Thu',
  friday: 'Fri',
  saturday: 'Sat',
  sunday: 'Sun'
};

export function generateId(): string {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

export function getCompletedDaysCount(habit: Habit): number {
  return Object.values(habit.completedDays).filter(Boolean).length;
}

export function getCompletionPercentage(habit: Habit): number {
  const completedCount = getCompletedDaysCount(habit);
  return Math.round((completedCount / 7) * 100);
}

export function isHabitCompleted(habit: Habit): boolean {
  return getCompletedDaysCount(habit) === 7;
}

export function calculateStreak(habit: Habit): number {
  const today = new Date().getDay();
  const dayMap = [6, 0, 1, 2, 3, 4, 5]; // Sunday is 0 in JS, but we want it as index 6
  const todayIndex = dayMap[today];
  
  let streak = 0;
  for (let i = 0; i < 7; i++) {
    const dayIndex = (todayIndex - i + 7) % 7;
    const dayName = DAYS_OF_WEEK[dayIndex];
    if (habit.completedDays[dayName]) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

export function saveHabitsToStorage(habits: Habit[]): void {
  try {
    localStorage.setItem('habits', JSON.stringify(habits));
  } catch (error) {
    console.error('Failed to save habits to localStorage:', error);
  }
}

export function loadHabitsFromStorage(): Habit[] {
  try {
    const storedHabits = localStorage.getItem('habits');
    if (!storedHabits) return [];
    
    const parsed = JSON.parse(storedHabits);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Failed to load habits from localStorage:', error);
    return [];
  }
}

export function createEmptyHabitDays(): Record<DayOfWeek, boolean> {
  return {
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false
  };
}