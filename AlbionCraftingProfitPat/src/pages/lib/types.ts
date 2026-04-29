export interface Material {
  name: string;
  silverValue: number;
}

export interface Artifact {
  name: string;
  silverValue: number;
}

export interface CraftInput {
  craftingSessionTitle: string;
  itemName: string;
  material1: Material;
  material2: Material;
  material1OnHand: number;
  material1Needed: number;
  material2OnHand: number;
  material2Needed: number;
  artifacts: Artifact[];
  artifactQuantity: number;
  artifactOnHand: number;
  returnRate: number; // percentage (0-100)
  taxPercentage: number; // percentage (0-100)
  marketValue: number; // silver value of crafted item
}

export interface CraftRound {
  roundNumber: number;
  material1Used: number;
  material2Used: number;
  itemsCrafted: number;
  material1Returned: number;
  material2Returned: number;
  material1Remaining: number;
  material2Remaining: number;
}

export interface CraftCalculation extends CraftInput {
  id: string;
  createdAt: number;
  roundBreakdown: CraftRound[];
  totalItemsCrafted: number;
  totalMaterial1Consumed: number;
  totalMaterial2Consumed: number;
  totalArtifactsUsed: number;
  finalMaterial1: number;
  finalMaterial2: number;
  finalArtifacts: number;
  totalMaterialCost: number;
  totalArtifactCost: number;
  totalExpenses: number;
  totalIncome: number; // before tax
  totalTaxPaid: number;
  totalProfit: number; // after tax
  remainingMaterialValue: number;
  remainingArtifactValue: number;
}
