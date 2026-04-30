'use client';

import { useState } from 'react';
import type { CraftInput, Artifact } from '../lib/types';
import styles from './CalculatorForm.module.css';

interface CalculatorFormProps {
  onSubmit: (input: CraftInput) => void;
}

export function CalculatorForm({ onSubmit }: CalculatorFormProps) {
  const [craftingSessionTitle, setCraftingSessionTitle] = useState('');
  const [itemName, setItemName] = useState('');
  const [material1Name, setMaterial1Name] = useState('');
  const [material1Value, setMaterial1Value] = useState('');
  const [material1OnHand, setMaterial1OnHand] = useState('');
  const [material1Needed, setMaterial1Needed] = useState('');
  const [material2Name, setMaterial2Name] = useState('');
  const [material2Value, setMaterial2Value] = useState('');
  const [material2OnHand, setMaterial2OnHand] = useState('');
  const [material2Needed, setMaterial2Needed] = useState('');
  const [artifactName, setArtifactName] = useState('');
  const [artifactValue, setArtifactValue] = useState('');
  const [artifactOnHand, setArtifactOnHand] = useState('0');
  const [artifactQuantity, setArtifactQuantity] = useState('0');
  const [returnRate, setReturnRate] = useState('');
  const [taxPercentage, setTaxPercentage] = useState('');
  const [marketValue, setMarketValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !craftingSessionTitle ||
      !itemName ||
      !material1Name ||
      !material1Value ||
      !material1OnHand ||
      !material1Needed ||
      !material2Name ||
      !material2Value ||
      !material2OnHand ||
      !material2Needed ||
      returnRate === '' ||
      taxPercentage === '' ||
      !marketValue
    ) {
      alert('Please fill in all required fields');
      return;
    }

    const artifacts: Artifact[] = [];
    if (artifactName && artifactValue && Number(artifactQuantity) > 0) {
      artifacts.push({
        name: artifactName,
        silverValue: Number(artifactValue),
      });
    }

    const input: CraftInput = {
      craftingSessionTitle,
      itemName,
      material1: {
        name: material1Name,
        silverValue: Number(material1Value),
      },
      material1OnHand: Number(material1OnHand),
      material1Needed: Number(material1Needed),
      material2: {
        name: material2Name,
        silverValue: Number(material2Value),
      },
      material2OnHand: Number(material2OnHand),
      material2Needed: Number(material2Needed),
      artifacts,
      artifactQuantity: Number(artifactQuantity),
      artifactOnHand: Number(artifactOnHand),
      returnRate: Number(returnRate),
      taxPercentage: Number(taxPercentage),
      marketValue: Number(marketValue),
    };

    onSubmit(input);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Albion Crafting Calculator</h2>

      {/* Item Details */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Item Details</h3>
        <div className={styles.formGroup}>
          <label className={styles.label}>Crafting Session Title *</label>
          <input
            type="text"
            className={styles.input}
            value={craftingSessionTitle}
            onChange={(e) => setCraftingSessionTitle(e.target.value)}
            placeholder="Session 1 Monday Craft- Bearpaws T5.3"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Item Name *</label>
          <input
            type="text"
            className={styles.input}
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="e.g., Bearpaws T5.3"
          />
        </div>
      </div>

      {/* Material 1 */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Material 1</h3>
        <div className={styles.twoColumn}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Material Name *</label>
            <input
              type="text"
              className={styles.input}
              value={material1Name}
              onChange={(e) => setMaterial1Name(e.target.value)}
              placeholder="e.g., Iron Bars"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Silver Value per Unit *</label>
            <input
              type="number"
              className={styles.input}
              value={material1Value}
              onChange={(e) => setMaterial1Value(e.target.value)}
              placeholder="0"
              step="0.01"
            />
          </div>
        </div>
        <div className={styles.twoColumn}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Amount on Hand *</label>
            <input
              type="number"
              className={styles.input}
              value={material1OnHand}
              onChange={(e) => setMaterial1OnHand(e.target.value)}
              placeholder="0"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Amount Needed per Craft *</label>
            <input
              type="number"
              className={styles.input}
              value={material1Needed}
              onChange={(e) => setMaterial1Needed(e.target.value)}
              placeholder="0"
            />
          </div>
        </div>
      </div>

      {/* Material 2 */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Material 2</h3>
        <div className={styles.twoColumn}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Material Name *</label>
            <input
              type="text"
              className={styles.input}
              value={material2Name}
              onChange={(e) => setMaterial2Name(e.target.value)}
              placeholder="e.g., Wooden Planks"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Silver Value per Unit *</label>
            <input
              type="number"
              className={styles.input}
              value={material2Value}
              onChange={(e) => setMaterial2Value(e.target.value)}
              placeholder="0"
              step="0.01"
            />
          </div>
        </div>
        <div className={styles.twoColumn}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Amount on Hand *</label>
            <input
              type="number"
              className={styles.input}
              value={material2OnHand}
              onChange={(e) => setMaterial2OnHand(e.target.value)}
              placeholder="0"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Amount Needed per Craft *</label>
            <input
              type="number"
              className={styles.input}
              value={material2Needed}
              onChange={(e) => setMaterial2Needed(e.target.value)}
              placeholder="0"
            />
          </div>
        </div>
      </div>

      {/* Artifact */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Artifact (Optional)</h3>
        <div className={styles.twoColumn}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Artifact Name</label>
            <input
              type="text"
              className={styles.input}
              value={artifactName}
              onChange={(e) => setArtifactName(e.target.value)}
              placeholder="e.g., Rune Artifact"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Silver Value per Artifact</label>
            <input
              type="number"
              className={styles.input}
              value={artifactValue}
              onChange={(e) => setArtifactValue(e.target.value)}
              placeholder="0"
              step="0.01"
            />
          </div>
        </div>
        <div className={styles.twoColumn}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Amount on Hand</label>
            <input
              type="number"
              className={styles.input}
              value={artifactOnHand}
              onChange={(e) => setArtifactOnHand(e.target.value)}
              placeholder="0"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Amount Needed per Craft</label>
            <input
              type="number"
              className={styles.input}
              value={artifactQuantity}
              onChange={(e) => setArtifactQuantity(e.target.value)}
              placeholder="0"
            />
          </div>
        </div>
      </div>

      {/* Rates & Value */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Rates & Value</h3>
        <div className={styles.threeColumn}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Resource Return Rate (%) *</label>
            <input
              type="number"
              className={styles.input}
              value={returnRate}
              onChange={(e) => setReturnRate(e.target.value)}
              placeholder="0"
              min="0"
              max="100"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Tax Percentage (%) *</label>
            <input
              type="number"
              className={styles.input}
              value={taxPercentage}
              onChange={(e) => setTaxPercentage(e.target.value)}
              placeholder="0"
              min="0"
              max="100"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Market Value per Item *</label>
            <input
              type="number"
              className={styles.input}
              value={marketValue}
              onChange={(e) => setMarketValue(e.target.value)}
              placeholder="0"
              step="0.01"
            />
          </div>
        </div>
      </div>

      <button type="submit" className={styles.submitButton}>
        Calculate Profit
      </button>
    </form>
  );
}
