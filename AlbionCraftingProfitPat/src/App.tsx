import styles from './App.module.css';

import { useState, useEffect } from 'react';
import { CalculatorForm } from './pages/CalculatorForm/CalculatorForm';
import { ResultsDisplay } from './pages/ResultsDisplay/ResultsDisplay';
import { SavedCalculations } from './pages/SavedCalculations/SavedCalculations';
import type { CraftInput, CraftCalculation } from './pages/lib/types';
import { calculateCraft } from './pages/lib/calculations';
import { saveCalculation, getCalculations, deleteCalculation } from './pages/lib/storage';

type AppState = 'home' | 'results' | 'saved-view';

function App() {
  const [appState, setAppState] = useState<AppState>('home');
  const [currentCalculation, setCurrentCalculation] = useState<CraftCalculation | null>(null);
  const [savedCalculations, setSavedCalculations] = useState<CraftCalculation[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setSavedCalculations(getCalculations());
    setMounted(true);
  }, []);

  const handleCalculate = (input: CraftInput) => {
    const calculation = calculateCraft(input);
    setCurrentCalculation(calculation);
    setAppState('results');
  };

  const handleSaveCalculation = () => {
    if (currentCalculation) {
      saveCalculation(currentCalculation);
      setSavedCalculations(getCalculations());
      alert('Calculation saved successfully!');
    }
  };

  const handleDeleteCalculation = (id: string) => {
    deleteCalculation(id);
    setSavedCalculations(getCalculations());
  };

  const handleSelectSavedCalculation = (calc: CraftCalculation) => {
    setCurrentCalculation(calc);
    setAppState('results');
  };

  const handleBack = () => {
    setAppState('home');
    setCurrentCalculation(null);
  };

  const handleViewSaved = () => {
    setAppState('saved-view');
  };

  const handleBackFromSaved = () => {
    setAppState('home');
  };

  if (!mounted) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.albionbackground}>
    <main className={styles.main}>
      
      <div className={styles.container}>
        {appState === 'home' && (
          <>
            <CalculatorForm onSubmit={handleCalculate} />
            {savedCalculations.length > 0 && (
              <button className={styles.viewSavedButton} onClick={handleViewSaved}>
                📊 View Saved Calculations ({savedCalculations.length})
              </button>
            )}
          </>
        )}

        {appState === 'results' && currentCalculation && (
          <ResultsDisplay
            calculation={currentCalculation}
            onSave={handleSaveCalculation}
            onBack={handleBack}
          />
        )}

        {appState === 'saved-view' && (
          <>
            <SavedCalculations
              calculations={savedCalculations}
              onSelect={handleSelectSavedCalculation}
              onDelete={handleDeleteCalculation}
            />
            <button className={styles.backButton} onClick={handleBackFromSaved}>
              ← Back to Calculator
            </button>
          </>
        )}
      </div>
      <footer className={styles.footer}>
        <p>Albion Online Crafting Profit Calculator • Created by Pat0616</p>
      </footer>
     
    </main>
     </div>
  )
}

export default App
