export interface Source {
  original: string;
  large: string;
}

export interface Photos {
  id: number;
  avg_color: string;
  src: Source;
  alt: string;
}
