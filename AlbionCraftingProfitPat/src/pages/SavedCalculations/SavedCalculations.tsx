'use client';

import type{ CraftCalculation } from '../lib/types';
import styles from './savedcalculations.module.css';

interface SavedCalculationsProps {
  calculations: CraftCalculation[];
  onSelect: (calculation: CraftCalculation) => void;
  onDelete: (id: string) => void;
}

export function SavedCalculations({ calculations, onSelect, onDelete }: SavedCalculationsProps) {
  const formatSilver = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (calculations.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No saved calculations yet. Create your first calculation!</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Saved Calculations</h2>
      <div className={styles.grid}>
        {calculations.map((calc) => (
          <div key={calc.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.itemInfo}>
                <h3 className={styles.itemName}>{calc.craftingSessionTitle}</h3>
                <p className={styles.timestamp}>
                  {calc.itemName} • {new Date(calc.createdAt).toLocaleDateString()} {new Date(calc.createdAt).toLocaleTimeString()}
                </p>
              </div>
              <button
                className={styles.deleteButton}
                onClick={() => onDelete(calc.id)}
                title="Delete calculation"
              >
                ✕
              </button>
            </div>

            <div className={styles.cardBody}>
              <div className={styles.stat}>
                <span className={styles.label}>Items Crafted</span>
                <span className={styles.statValue}>{calc.totalItemsCrafted}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.label}>Total Cost</span>
                <span className={styles.statValue}>{formatSilver(calc.totalExpenses)} silver</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.label}>Total Income</span>
                <span className={styles.statValue}>{formatSilver(calc.totalIncome)} silver</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.label}>Profit</span>
                <span className={`${styles.statValue} ${calc.totalProfit >= 0 ? styles.profitable : styles.loss}`}>
                  {formatSilver(calc.totalProfit)} silver
                </span>
              </div>
            </div>

            <div className={styles.materials}>
              <span className={styles.material}>
                <strong>{calc.material1.name}</strong>: {calc.finalMaterial1} units
              </span>
              <span className={styles.material}>
                <strong>{calc.material2.name}</strong>: {calc.finalMaterial2} units
              </span>
              {calc.finalArtifacts > 0 && (
                <span className={styles.material}>
                  <strong>{calc.artifacts[0]?.name || 'Artifact'}</strong>: {calc.finalArtifacts} units
                </span>
              )}
            </div>

            <button
              className={styles.viewButton}
              onClick={() => onSelect(calc)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
