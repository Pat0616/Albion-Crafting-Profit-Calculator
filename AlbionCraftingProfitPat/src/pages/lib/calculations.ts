import type { CraftInput, CraftCalculation, CraftRound } from './types';

export function calculateCraft(input: CraftInput): CraftCalculation {
  const id = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const createdAt = Date.now();

  let material1 = input.material1OnHand;
  let material2 = input.material2OnHand;
  let artifacts = input.artifactOnHand;
  let artifactsUsed = 0;

  const roundBreakdown: CraftRound[] = [];
  let totalItemsCrafted = 0;
  let roundNumber = 1;

  // -----------------------------
  // CRAFTING SIMULATION LOOP
  // (used ONLY to determine how many items can be crafted)
  // -----------------------------
  while (
    material1 >= input.material1Needed &&
    material2 >= input.material2Needed &&
    artifacts >= input.artifactQuantity
  ) {
    material1 -= input.material1Needed;
    material2 -= input.material2Needed;
    artifacts -= input.artifactQuantity;

    artifactsUsed += input.artifactQuantity;
    totalItemsCrafted += 1;

    // return rate simulation (ONLY for continuing crafting, NOT cost)
    const material1Returned = Math.floor(
      input.material1Needed * (input.returnRate / 100)
    );
    const material2Returned = Math.floor(
      input.material2Needed * (input.returnRate / 100)
    );

    material1 += material1Returned;
    material2 += material2Returned;

    roundBreakdown.push({
      roundNumber,
      material1Used: input.material1Needed,
      material2Used: input.material2Needed,
      itemsCrafted: 1,
      material1Returned,
      material2Returned,
      material1Remaining: material1,
      material2Remaining: material2,
    });

    roundNumber++;
  }

  // -----------------------------
  // FIXED COST MODEL (IMPORTANT CHANGE)
  // ONLY initial inventory matters
  // -----------------------------
  const totalMaterialCost =
    input.material1OnHand * input.material1.silverValue +
    input.material2OnHand * input.material2.silverValue;

  // -----------------------------
  // FIXED ARTIFACT COST MODEL
  // -----------------------------
  const totalArtifactCost =
    input.artifacts.length > 0
      ? input.artifactOnHand * input.artifacts[0].silverValue
      : 0;

  const totalExpenses = totalMaterialCost + totalArtifactCost;

  // -----------------------------
  // INCOME CALCULATION
  // -----------------------------
  const totalIncome = input.marketValue * totalItemsCrafted;
  const totalTaxPaid = Math.floor(
    totalIncome * (input.taxPercentage / 100)
  );

  const totalProfit = totalIncome - totalTaxPaid - totalExpenses;

  // -----------------------------
  // REMAINING VALUE (optional display only)
  // -----------------------------
  const remainingMaterialValue =
    material1 * input.material1.silverValue +
    material2 * input.material2.silverValue;

  const finalArtifacts = artifacts;

  const remainingArtifactValue =
    input.artifacts.length > 0
      ? finalArtifacts * input.artifacts[0].silverValue
      : 0;

  // -----------------------------
  // RETURN RESULT
  // -----------------------------
  return {
    ...input,
    id,
    createdAt,
    roundBreakdown,
    totalItemsCrafted,

    totalMaterial1Consumed: input.material1OnHand,
    totalMaterial2Consumed: input.material2OnHand,
    totalArtifactsUsed: artifactsUsed,

    finalMaterial1: material1,
    finalMaterial2: material2,
    finalArtifacts,

    totalMaterialCost,
    totalArtifactCost,
    totalExpenses,

    totalIncome,
    totalTaxPaid,
    totalProfit,

    remainingMaterialValue,
    remainingArtifactValue,
  };
}