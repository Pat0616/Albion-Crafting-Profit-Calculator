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
  let calculations = stored ? JSON.parse(stored) : [];

  // Fix any duplicate IDs from before the UUID fix
  calculations = fixDuplicateIds(calculations);

  return calculations;
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

function fixDuplicateIds(calculations: CraftCalculation[]): CraftCalculation[] {
  const seenIds = new Set<string>();
  const fixedCalculations: CraftCalculation[] = [];
  let hasDuplicates = false;

  for (const calc of calculations) {
    if (seenIds.has(calc.id)) {
      // Found a duplicate ID, generate a new unique ID
      hasDuplicates = true;
      const newCalc = {
        ...calc,
        id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      };
      fixedCalculations.push(newCalc);
    } else {
      seenIds.add(calc.id);
      fixedCalculations.push(calc);
    }
  }

  // If we found and fixed duplicates, save the updated calculations
  if (hasDuplicates) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fixedCalculations));
  }

  return fixedCalculations;
}
