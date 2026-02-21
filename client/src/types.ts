export type EquipmentType = "Glove" | "Armor" | "Accessory";

export type StatType =
  | "Strength"
  | "Intellect"
  | "Agility"
  | "Willpower"
  | "Defense"
  | "HP"
  | "Attack"
  | "CritRate"
  | "ComboDmg"
  | "SkillDmg"
  | "UltRecharge"
  | "UltDmg"
  | "ArtsPower"
  | "PhysDmg"
  | "HealEffect"
  | "IceElecDmg"
  | "FireNatDmg"
  | "DmgReduc"
  | "BreakDmg"
  | "NormalDmg"
  | "AllSkillDmg"
  | "MainStat"
  | "SubStat"
  | "ArtsDmg";

export interface Stat {
  type: StatType;
  value: number;
}

export interface Equipment {
  id: string;
  name: string;
  type: EquipmentType;
  set: string;
  mainStat: Stat;
  subStats: Stat[];
}
