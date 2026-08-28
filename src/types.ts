export type RoutePage = 'home' | 'documentales' | 'shelby-cobra' | 'toyota-hilux' | 'f1' | 'xj220' | 'f40-miura' | 'countach' | 'r34' | 'supra' | 'mazda-787b' | 'nsx' | 'camaro-mustang' | 'datos' | 'foro' | 'admin-panel';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: 'admin' | 'subscriber';
  receiveDocumentaryAlerts: boolean;
  receiveFactsAlerts: boolean;
  createdAt: string;
}

export interface BroadcastMessage {
  id: string;
  senderEmail: string;
  senderName: string;
  subject: string;
  category: 'documental' | 'datos' | 'noticia' | 'especial';
  targetAudience: 'all' | 'documentales' | 'datos';
  body: string;
  targetUrl?: string;
  targetName?: string;
  sentAt: string;
  recipientCount: number;
  status: 'sent' | 'draft';
}

export interface UserInboxNotification {
  id: string;
  userId: string;
  broadcastId: string;
  senderEmail: string;
  senderName: string;
  subject: string;
  preview: string;
  body: string;
  category: string;
  targetUrl?: string;
  targetName?: string;
  read: boolean;
  receivedAt: string;
}

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
  era?: string;
  statHighlight?: {
    value: string;
    label: string;
  };
  secretQuote?: string;
  sourceOrPlace?: string;
}

export type ForumCategory = 'autos' | 'recomendaciones' | 'general' | 'debate' | 'mecanica' | 'clasicos' | 'circuitos';

export interface ForumComment {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  userEmail: string;
  userRole?: 'admin' | 'subscriber' | string;
  content: string;
  createdAt: string;
  score?: number;
  upvotedBy?: string[];
  downvotedBy?: string[];
  parentId?: string | null;
}

export interface ForumPost {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userRole?: 'admin' | 'subscriber' | string;
  category: ForumCategory;
  tag: string;
  flair?: string;
  title: string;
  content: string;
  carModel?: string;
  recommendationUrl?: string;
  recommendationType?: string;
  createdAt: string;
  likesCount: number;
  likedBy?: string[];
  score?: number;
  upvotedBy?: string[];
  downvotedBy?: string[];
  commentsCount: number;
  pinned?: boolean;
}

