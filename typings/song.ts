export interface Ar {
  id: number;
  name: string;
  tns: unknown[];
  alias: unknown[];
}

export interface Al {
  id: number;
  name: string;
  picUrl: string;
  tns: unknown[];
  pic: number;
}

export interface H {
  br: number;
  fid: number;
  size: number;
  vd: number;
}

export interface M {
  br: number;
  fid: number;
  size: number;
  vd: number;
}

export interface L {
  br: number;
  fid: number;
  size: number;
  vd: number;
}

export interface Data {
  name: string;
  id: number;
  pst: number;
  t: number;
  ar: Ar[];
  alia?: unknown[];
  pop: number;
  st: number;
  rt: string;
  fee: number;
  v: number;
  crbt?: unknown;
  cf: string;
  al: Al;
  dt: number;
  h: H;
  m: M;
  l: L;
  a?: unknown;
  cd: string;
  no: number;
  rtUrl?: unknown;
  ftype: number;
  rtUrls: unknown[];
  djId: number;
  copyright: number;
  s_id: number;
  mark: number;
  originCoverType: number;
  originSongSimpleData?: unknown;
  single: number;
  noCopyrightRcmd?: unknown;
  rtype: number;
  rurl?: unknown;
  mst: number;
  cp: number;
  mv: number;
  publishTime: number;
}

export interface SongData {
  resourceId: string;
  playTime: number;
  resourceType: string;
  data: Data;
  banned: boolean;
}

export type Song = Pick<SongData, "resourceId" | "playTime"> & {
  name: SongData["data"]["name"];
  artist: string[];
  album: SongData["data"]["al"]["name"];
  albumPicUrl: SongData["data"]["al"]["picUrl"];
};
