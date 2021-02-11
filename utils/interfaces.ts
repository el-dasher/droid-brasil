interface OsuDroidPlay {
  title: string;
  accuracy: number;
  score: number;
  combo: number;
  miss: number;
  mods: string;
  timestamp?: string;
  hash?: string | null;
  pp?: number;
}

interface OsuDroidUser {
  uid: number;
  username: string;
  overall_acc: number;
  total_score: Number;
  rank_score: string;
  avatar: string;
  total_dpp?: number;
  play_count?: Number;
  country?: string;
  recent_plays?: Array<OsuDroidPlay>;
  pp_data?: Array<OsuDroidPlay>;
  speed?: number;
  aim?: number;
  reading?: number;
  exists?: boolean;
}

export type { OsuDroidPlay, OsuDroidUser };
