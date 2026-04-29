'use client';

import type { CraftCalculation } from '../lib/types';
import styles from './resultsdisplay.module.css';

interface ResultsDisplayProps {
  calculation: CraftCalculation;
  onSave: () => void;
  onBack: () => void;
}

export function ResultsDisplay({ calculation, onSave, onBack }: ResultsDisplayProps) {
  const formatSilver = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className={styles.resultsContainer}>
      {/* Receipt Header */}
      <div className={styles.receipt}>
        <div className={styles.header}>
          <h2 className={styles.receiptTitle}>CRAFTING PROFIT RECEIPT</h2>
          <p className={styles.sessionTitle}>{calculation.craftingSessionTitle}</p>
          <p className={styles.itemName}>{calculation.itemName}</p>
          <p className={styles.timestamp}>
            {new Date(calculation.createdAt).toLocaleString()}
          </p>
        </div>

        {/* Summary Section */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>SUMMARY</h3>
          <div className={styles.summaryGrid}>
            <div className={styles.summaryItem}>
              <span className={styles.label}>Total Items Crafted</span>
              <span className={styles.value}>{calculation.totalItemsCrafted}</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.label}>Total Profit</span>
              <span className={`${styles.value} ${calculation.totalProfit >= 0 ? styles.positive : styles.negative}`}>
                {formatSilver(calculation.totalProfit)} silver
              </span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.label}>Total Expenses</span>
              <span className={styles.value}>{formatSilver(calculation.totalExpenses)} silver</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.label}>Total Income (before tax)</span>
              <span className={styles.value}>{formatSilver(calculation.totalIncome)} silver</span>
            </div>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>COST BREAKDOWN</h3>
          <div className={styles.breakdownTable}>
            <div className={styles.tableRow}>
              <span className={styles.tableLabel}>Material {calculation.material1.name}</span>
              <span className={styles.tableValue}>{calculation.totalMaterial1Consumed} units @ {formatSilver(calculation.material1.silverValue)}/ea</span>
              <span className={styles.tableAmount}>{formatSilver(calculation.totalMaterial1Consumed * calculation.material1.silverValue)}</span>
            </div>
            <div className={styles.tableRow}>
              <span className={styles.tableLabel}>Material {calculation.material2.name}</span>
              <span className={styles.tableValue}>{calculation.totalMaterial2Consumed} units @ {formatSilver(calculation.material2.silverValue)}/ea</span>
              <span className={styles.tableAmount}>{formatSilver(calculation.totalMaterial2Consumed * calculation.material2.silverValue)}</span>
            </div>
            {calculation.totalArtifactCost > 0 && (
              <div className={styles.tableRow}>
                <span className={styles.tableLabel}>{calculation.artifacts[0]?.name || 'Artifact'}</span>
                <span className={styles.tableValue}>{calculation.totalArtifactsUsed} used @ {formatSilver(calculation.artifacts[0]?.silverValue || 0)}/ea</span>
                <span className={styles.tableAmount}>{formatSilver(calculation.totalArtifactCost)}</span>
              </div>
            )}
            <div className={styles.tableRow + ' ' + styles.totalRow}>
              <span className={styles.tableLabel}>TOTAL COST</span>
              <span></span>
              <span className={styles.tableAmount}>{formatSilver(calculation.totalExpenses)}</span>
            </div>
          </div>
        </div>

        {/* Income & Tax */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>INCOME & TAX</h3>
          <div className={styles.breakdownTable}>
            <div className={styles.tableRow}>
              <span className={styles.tableLabel}>Market Value per Item</span>
              <span></span>
              <span className={styles.tableAmount}>{formatSilver(calculation.marketValue)}</span>
            </div>
            <div className={styles.tableRow}>
              <span className={styles.tableLabel}>Total Income (before tax)</span>
              <span className={styles.tableValue}>{calculation.totalItemsCrafted} items</span>
              <span className={styles.tableAmount}>{formatSilver(calculation.totalIncome)}</span>
            </div>
            <div className={styles.tableRow}>
              <span className={styles.tableLabel}>Tax ({calculation.taxPercentage}%)</span>
              <span></span>
              <span className={styles.tableAmount}>-{formatSilver(calculation.totalTaxPaid)}</span>
            </div>
            <div className={styles.tableRow + ' ' + styles.totalRow}>
              <span className={styles.tableLabel}>NET INCOME</span>
              <span></span>
              <span className={styles.tableAmount}>{formatSilver(calculation.totalIncome - calculation.totalTaxPaid)}</span>
            </div>
          </div>
        </div>

        {/* Remaining Materials */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>REMAINING MATERIALS</h3>
          <div className={styles.breakdownTable}>
            <div className={styles.tableRow}>
              <span className={styles.tableLabel}>{calculation.material1.name}</span>
              <span className={styles.tableValue}>{calculation.finalMaterial1} units</span>
              <span className={styles.tableAmount}>{formatSilver(calculation.finalMaterial1 * calculation.material1.silverValue)}</span>
            </div>
            <div className={styles.tableRow}>
              <span className={styles.tableLabel}>{calculation.material2.name}</span>
              <span className={styles.tableValue}>{calculation.finalMaterial2} units</span>
              <span className={styles.tableAmount}>{formatSilver(calculation.finalMaterial2 * calculation.material2.silverValue)}</span>
            </div>
            {calculation.finalArtifacts > 0 && (
              <div className={styles.tableRow}>
                <span className={styles.tableLabel}>{calculation.artifacts[0]?.name || 'Artifact'}</span>
                <span className={styles.tableValue}>{calculation.finalArtifacts} units</span>
                <span className={styles.tableAmount}>{formatSilver(calculation.remainingArtifactValue)}</span>
              </div>
            )}
            <div className={styles.tableRow + ' ' + styles.totalRow}>
              <span className={styles.tableLabel}>TOTAL REMAINING VALUE</span>
              <span></span>
              <span className={styles.tableAmount}>{formatSilver(calculation.remainingMaterialValue + calculation.remainingArtifactValue)}</span>
            </div>
          </div>
        </div>

        {/* Crafting Rounds Breakdown */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>CRAFTING ROUNDS BREAKDOWN</h3>
          <div className={styles.roundsContainer}>
            {calculation.roundBreakdown.map((round) => (
              <div key={round.roundNumber} className={styles.roundCard}>
                <h4 className={styles.roundTitle}>Round {round.roundNumber}</h4>
                <div className={styles.roundGrid}>
                  <div className={styles.roundItem}>
                    <span className={styles.roundLabel}>{calculation.material1.name} Used</span>
                    <span className={styles.roundValue}>{round.material1Used}</span>
                  </div>
                  <div className={styles.roundItem}>
                    <span className={styles.roundLabel}>{calculation.material2.name} Used</span>
                    <span className={styles.roundValue}>{round.material2Used}</span>
                  </div>
                  <div className={styles.roundItem}>
                    <span className={styles.roundLabel}>Items Crafted</span>
                    <span className={styles.roundValue}>{round.itemsCrafted}</span>
                  </div>
                  <div className={styles.roundItem}>
                    <span className={styles.roundLabel}>{calculation.material1.name} Returned</span>
                    <span className={styles.roundValue}>{round.material1Returned}</span>
                  </div>
                  <div className={styles.roundItem}>
                    <span className={styles.roundLabel}>{calculation.material2.name} Returned</span>
                    <span className={styles.roundValue}>{round.material2Returned}</span>
                  </div>
                  <div className={styles.roundItem}>
                    <span className={styles.roundLabel}>Remaining After</span>
                    <span className={styles.roundValue}>M1: {round.material1Remaining} | M2: {round.material2Remaining}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final Profit */}
        <div className={styles.finalProfit}>
          <div className={styles.profitLabel}>FINAL PROFIT (After Tax & Expenses)</div>
          <div className={`${styles.profitValue} ${calculation.totalProfit >= 0 ? styles.positive : styles.negative}`}>
            {formatSilver(calculation.totalProfit)} silver
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className={styles.actions}>
        <button className={styles.saveButton} onClick={onSave}>
          Save Calculation
        </button>
        <button className={styles.backButton} onClick={onBack}>
          Calculate Again
        </button>
      </div>
    </div>
  );
}
