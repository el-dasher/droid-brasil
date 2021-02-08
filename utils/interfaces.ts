interface OsuDroidPlay {
  accuracy: Number;
  combo: Number;
  hash: string;
  miss: Number;
  mods: string;
  pp: Number;
  title: string;
}

interface OsuDroidUser {
  id: Number;
  username: string;
  aim: Number;
  overall_acc: Number;
  pp_data: Array<OsuDroidPlay>;
  rank_score: string;
  reading: Number;
  speed: Number;
  total_dpp: Number;
  avatar: string;
}

export type { OsuDroidPlay, OsuDroidUser };
