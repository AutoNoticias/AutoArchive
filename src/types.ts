export type RoutePage = 'home' | 'documentales' | 'xj220' | 'f40-miura' | 'countach' | 'datos';

export interface Chapter {
  number: string;
  category: string;
  title: string;
  subtitle?: string;
  paragraphs: string[];
  isDark?: boolean;
  image?: {
    src: string;
    alt: string;
    caption: string;
    tag: string;
  };
  highlight?: {
    value: string;
    label: string;
    description?: string;
  };
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface SpecItem {
  label: string;
  value: string;
}

export interface StatItem {
  value: string;
  unit: string;
  label: string;
}

export interface FactItem {
  id: string;
  number: string;
  category: string;
  title: string;
  summary: string;
  details: string;
  tag: string;
}
