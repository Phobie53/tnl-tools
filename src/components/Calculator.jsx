import { useState, useEffect } from 'react';
import { calculateEvasionChance, calculateSkillEffect } from '../utils/calculations';

const Calculator = () => {
  const [stats, setStats] = useState({
    yourEvasion: '',
    enemyHit: '',
    skillDamageBoost: '',
    skillDamageResistance: ''
  });

  useEffect(() => {
    const savedStats = sessionStorage.getItem('tnlStats');
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('tnlStats', JSON.stringify(stats));
  }, [stats]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStats(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const evasionChance = stats.yourEvasion && stats.enemyHit
    ? calculateEvasionChance(Number(stats.yourEvasion), Number(stats.enemyHit))
    : null;

  const damageBoost = stats.skillDamageBoost
    ? calculateSkillEffect(Number(stats.skillDamageBoost))
    : null;

  const damageResistance = stats.skillDamageResistance
    ? calculateSkillEffect(Number(stats.skillDamageResistance))
    : null;

  return (
    <div className="calculator">
      <section className="section">
        <h2>Hit/Evasion Calculator</h2>
        <div className="input-group">
          <label>Your Evasion</label>
          <input
            type="number"
            name="yourEvasion"
            value={stats.yourEvasion}
            onChange={handleChange}
            placeholder="Enter your evasion stat"
          />
        </div>
        <div className="input-group">
          <label>Enemy Hit</label>
          <input
            type="number"
            name="enemyHit"
            value={stats.enemyHit}
            onChange={handleChange}
            placeholder="Enter enemy hit stat"
          />
        </div>
        {evasionChance !== null && (
          <div className="result">
            Evasion Chance: {evasionChance.toFixed(2)}%
          </div>
        )}
      </section>

      <section className="section">
        <h2>Skill Damage Calculator</h2>
        <div className="input-group">
          <label>Skill Damage Boost</label>
          <input
            type="number"
            name="skillDamageBoost"
            value={stats.skillDamageBoost}
            onChange={handleChange}
            placeholder="Enter skill damage boost"
          />
        </div>
        {damageBoost !== null && (
          <div className="result">
            Skill Damage Boost Effect: {damageBoost.toFixed(2)}%
          </div>
        )}

        <div className="input-group">
          <label>Skill Damage Resistance</label>
          <input
            type="number"
            name="skillDamageResistance"
            value={stats.skillDamageResistance}
            onChange={handleChange}
            placeholder="Enter skill damage resistance"
          />
        </div>
        {damageResistance !== null && (
          <div className="result">
            Skill Damage Resistance Effect: {damageResistance.toFixed(2)}%
          </div>
        )}
      </section>
    </div>
  );
};

export default Calculator;
