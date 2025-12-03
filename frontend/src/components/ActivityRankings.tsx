import React from 'react';
import { ActivityRanking } from '../types';
import { ActivityCard } from './ActivityCard';
import './ActivityRankings.css';

interface ActivityRankingsProps {
  rankings: ActivityRanking[];
  city: string;
}

export const ActivityRankings: React.FC<ActivityRankingsProps> = ({ rankings, city }) => {
  // Sort activities by average score
  const sortedRankings = [...rankings].sort((a, b) => {
    const avgA = a.scores.reduce((sum, score) => sum + score.score, 0) / a.scores.length;
    const avgB = b.scores.reduce((sum, score) => sum + score.score, 0) / b.scores.length;
    return avgB - avgA;
  });

  // Get overall best day across all activities
  const getOverallBestDay = () => {
    const dayScores: { [date: string]: number } = {};
    
    rankings.forEach(ranking => {
      ranking.scores.forEach(score => {
        if (!dayScores[score.date]) {
          dayScores[score.date] = 0;
        }
        dayScores[score.date] += score.score;
      });
    });
    
    const bestDay = Object.entries(dayScores).sort(([, a], [, b]) => b - a)[0];
    return bestDay ? { date: bestDay[0], score: Math.round(bestDay[1] / rankings.length) } : null;
  };

  const overallBestDay = getOverallBestDay();

  return (
    <div className="activity-rankings">
      <div className="rankings-header">
        <h2>
          {city} - 7-Day Activity Rankings
          <span className="sub-header">Best days for each activity</span>
        </h2>
        
        {overallBestDay && (
          <div className="overall-best">
            <div className="best-day-badge">
              <span className="badge-icon">🏆</span>
              <div>
                <div className="badge-label">Overall Best Day</div>
                <div className="badge-value">{overallBestDay.date}</div>
                <div className="badge-score">Avg Score: {overallBestDay.score}/100</div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="rankings-grid">
        {sortedRankings.map((ranking) => (
          <ActivityCard key={ranking.activity} ranking={ranking} />
        ))}
      </div>
      
      <div className="rankings-footer">
        <div className="legend">
          <div className="legend-item">
            <span className="legend-color excellent"></span>
            <span>Excellent (80-100)</span>
          </div>
          <div className="legend-item">
            <span className="legend-color good"></span>
            <span>Good (60-79)</span>
          </div>
          <div className="legend-item">
            <span className="legend-color fair"></span>
            <span>Fair (40-59)</span>
          </div>
          <div className="legend-item">
            <span className="legend-color poor"></span>
            <span>Poor (20-39)</span>
          </div>
          <div className="legend-item">
            <span className="legend-color bad"></span>
            <span>Bad (0-19)</span>
          </div>
        </div>
        <div className="disclaimer">
          <small>Scores are calculated based on temperature, precipitation, wind, and other weather factors.</small>
        </div>
      </div>
    </div>
  );
};
