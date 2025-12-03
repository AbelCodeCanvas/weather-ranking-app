import React from 'react';
import { ActivityRanking } from '../types';
import './ActivityCard.css';

interface ActivityCardProps {
  ranking: ActivityRanking;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ ranking }) => {
  const getActivityIcon = (activity: string) => {
    switch(activity) {
      case 'Skiing': return '⛷️';
      case 'Surfing': return '🏄';
      case 'Outdoor Sightseeing': return '🏞️';
      case 'Indoor Sightseeing': return '🏛️';
      default: return '📊';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'excellent';
    if (score >= 60) return 'good';
    if (score >= 40) return 'fair';
    if (score >= 20) return 'poor';
    return 'bad';
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const avgScore = Math.round(
    ranking.scores.reduce((sum, score) => sum + score.score, 0) / ranking.scores.length
  );

  return (
    <div className="activity-card">
      <div className="card-header">
        <div className="activity-icon">{getActivityIcon(ranking.activity)}</div>
        <div className="activity-info">
          <h3 className="activity-title">{ranking.activity}</h3>
          <div className="activity-meta">
            <span className="avg-score">
              Avg: <strong>{avgScore}/100</strong>
            </span>
            {ranking.bestDay && (
              <span className="best-day">
                Best: <strong>{formatDate(ranking.bestDay)}</strong>
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="scores-container">
        {ranking.scores.map((score) => (
          <div key={score.date} className="score-item">
            <div className="score-date">{formatDate(score.date)}</div>
            <div className="score-bar-container">
              <div 
                className={`score-bar ${getScoreColor(score.score)}`}
                style={{ width: `${score.score}%` }}
                title={`Score: ${score.score}/100`}
              >
                <span className="score-value">{score.score}</span>
              </div>
            </div>
            <div className="score-description">{score.description}</div>
          </div>
        ))}
      </div>
      
      <div className="card-footer">
        {ranking.worstDay && (
          <div className="worst-day">
            <span className="warning-icon">⚠️</span>
            Worst day: {formatDate(ranking.worstDay)}
          </div>
        )}
      </div>
    </div>
  );
};
