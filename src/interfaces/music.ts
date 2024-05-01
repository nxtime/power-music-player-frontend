export interface Album {
  name: string;
  cover: string;
  songs: string[];
}

export interface Song {
  name: string;
  cover: string;
}

export enum TrackSequence {
  Random = 0,
  Sequence = 1,
  Repeat = 2
}

