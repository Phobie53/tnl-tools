export const calculateEvasionChance = (yourEvasion, enemyHit) => {
  const chance = (yourEvasion - enemyHit) / (yourEvasion - enemyHit + 1000) * 100;
  return Math.max(0, Math.min(100, chance));
};

export const calculateSkillEffect = (value) => {
  const effect = (value / (value + 1000)) * 100;
  return Math.max(0, Math.min(100, effect));
};
