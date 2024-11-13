import React, { useState, useEffect } from 'react';
import { GiCrossedSwords, GiDodging, GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';
import { BiHelpCircle } from 'react-icons/bi';

const Calculator = () => {
  const [stats, setStats] = useState({
    crit: '',
    enemyEndurance: '',
    evasion: '',
    enemyHit: '',
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

  const calculateCriticalChance = (crit, endurance) => {
    if (!crit || !endurance) return null;
    const chance = ((crit - endurance) / (crit - endurance + 1000)) * 100;
    return Math.max(0, Math.min(100, chance));
  };

  const calculateEvasionChance = (evasion, hit) => {
    if (!evasion || !hit) return null;
    const chance = ((evasion - hit) / (evasion - hit + 1000)) * 100;
    return Math.max(0, Math.min(100, chance));
  };

  const criticalChance = calculateCriticalChance(
    Number(stats.crit),
    Number(stats.enemyEndurance)
  );

  const evasionChance = calculateEvasionChance(
    Number(stats.evasion),
    Number(stats.enemyHit)
  );

  const hitChance = evasionChance !== null ? 100 - evasionChance : null;

  return (
    <div className="calculators-grid">
      <div className="calculator">
        <h2 className="section-title">
          <GiCrossedSwords />
          Critique
        </h2>

        <div className="formula-container">
          <div className="formula-title">
            <span>Formule</span>
          </div>
          <div className="formula">
            Chance = ((Crit - Endurance) / (Crit - Endurance + 1000)) × 100%
          </div>
          <div className="tooltip" data-tooltip="Calcule la chance d'infliger un coup critique en fonction de votre stat Critique et de l'Endurance de l'ennemi.">
            <BiHelpCircle />
          </div>
        </div>

        <div className="input-group">
          <label className="input-label">
            Votre Critique
          </label>
          <input
            type="number"
            name="crit"
            value={stats.crit}
            onChange={handleChange}
            placeholder="Entrez votre stat Critique"
            className="input"
          />
        </div>

        <div className="input-group">
          <label className="input-label">
            Endurance Ennemie
          </label>
          <input
            type="number"
            name="enemyEndurance"
            value={stats.enemyEndurance}
            onChange={handleChange}
            placeholder="Entrez l'endurance ennemie"
            className="input"
          />
        </div>

        {criticalChance !== null && (
          <div className="result">
            <span className="result-label">Chance de Critique</span>
            <span className="result-value">{criticalChance.toFixed(2)}%</span>
          </div>
        )}
      </div>

      <div className="calculator">
        <h2 className="section-title">
          <GiDodging />
          Évasion/Toucher
        </h2>

        <div className="formula-container">
          <div className="formula-title">
            <span>Formule</span>
          </div>
          <div className="formula">
            Évasion = ((Évasion - Toucher) / (Évasion - Toucher + 1000)) × 100%
          </div>
          <div className="tooltip" data-tooltip="Calcule vos chances d'esquiver les attaques ennemies en fonction de votre Évasion et du Toucher de l'ennemi.">
            <BiHelpCircle />
          </div>
        </div>

        <div className="input-group">
          <label className="input-label">
            Votre Évasion
          </label>
          <input
            type="number"
            name="evasion"
            value={stats.evasion}
            onChange={handleChange}
            placeholder="Entrez votre stat Évasion"
            className="input"
          />
        </div>

        <div className="input-group">
          <label className="input-label">
            Toucher Ennemi
          </label>
          <input
            type="number"
            name="enemyHit"
            value={stats.enemyHit}
            onChange={handleChange}
            placeholder="Entrez le toucher ennemi"
            className="input"
          />
        </div>

        {evasionChance !== null && (
          <>
            <div className="result">
              <span className="result-label">Chance d'Évasion</span>
              <span className="result-value">{evasionChance.toFixed(2)}%</span>
            </div>
            <div className="result" style={{ marginTop: '0.5rem' }}>
              <span className="result-label">Chance de se faire Toucher</span>
              <span className="result-value">{hitChance.toFixed(2)}%</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Calculator;
