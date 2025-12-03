export interface DailyScore {
  date: string;
  score: number;
  description: string;
}

export interface ActivityRanking {
  activity: string;
  scores: DailyScore[];
  bestDay: string | null;
  worstDay: string | null;
}
