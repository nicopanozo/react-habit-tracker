export interface Habit {
  id: string;
  name: string;
  color: string;
  completedDays: Record<DayOfWeek, boolean>;
  createdAt: string;
}

export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export interface HabitFormData {
  name: string;
  color: string;
}

export interface EditHabitData {
  id: string;
  name: string;
  color: string;
}

export type FilterType = 'all' | 'completed' | 'incomplete';

export type SortType = 'name' | 'streak' | 'created';

export type Theme = 'light' | 'dark';