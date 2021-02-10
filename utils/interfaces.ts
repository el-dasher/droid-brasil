interface OsuDroidPlay {
  title: string;
  accuracy: number;
  combo: number;
  hash: string;
  miss: number;
  mods: string;
  pp?: number;
}

interface OsuDroidUser {
  uid: number;
  username: string;
  overall_acc: number;
  total_score: Number;
  rank_score: string;
  total_dpp: number;
  avatar: string;
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
