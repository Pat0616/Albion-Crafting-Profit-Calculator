import type { CraftCalculation } from './types';

const STORAGE_KEY = 'albion_crafting_calculations';

export function saveCalculation(calculation: CraftCalculation): void {
  if (typeof window === 'undefined') return;

  const existing = getCalculations();
  existing.push(calculation);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}

export function getCalculations(): CraftCalculation[] {
  if (typeof window === 'undefined') return [];

  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function deleteCalculation(id: string): void {
  if (typeof window === 'undefined') return;

  const existing = getCalculations();
  const filtered = existing.filter((calc) => calc.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function getCalculationById(id: string): CraftCalculation | null {
  const calculations = getCalculations();
  return calculations.find((calc) => calc.id === id) || null;
}
