// ---------------------------------------------------------------------------
// Core domain types for TalentLab
// ---------------------------------------------------------------------------

// --- Talents (TalentLab-60) -------------------------------------------------

export type TalentDomain =
  | 'thinking'
  | 'creativity'
  | 'people'
  | 'action'
  | 'digital';

/** Canonical talent id, e.g. 'analyst'. Kept as string for ergonomics. */
export type TalentId = string;

export interface Talent {
  id: TalentId;
  number: number; // 1..60
  domain: TalentDomain;
  name: string;
  shortDesc: string;
  fullDesc: string;
  strengths: string[];
  shadowSide: string[];
  developTips: string[];
  pairsWellWith: TalentId[];
  icon: string; // lucide icon name
  color: string; // hex
}

export interface TalentResult {
  talent: Talent;
  score: number; // raw accumulated score
  percent: number; // 0..100, normalized
  rank: number; // 1..60
}

// --- RIASEC -----------------------------------------------------------------

export type RiasecAxis = 'R' | 'I' | 'A' | 'S' | 'E' | 'C';

export interface RiasecResult {
  code: string; // top-3 e.g. "AIE"
  scores: Record<RiasecAxis, number>; // 0..100 per axis
}

// --- Questions & answers ----------------------------------------------------

export type QuestionType = 'scale1to5' | 'choice4' | 'choice6images';

export type ScreeningCategory =
  | 'temperament'
  | 'thinking'
  | 'emotion'
  | 'values';

export type ScoringCategory =
  | 'cognitive'
  | 'interests'
  | 'lifeValues'
  | 'behavior';

export type QuestionCategory = ScreeningCategory | ScoringCategory;

/** Maps an answer key (1..5 for scales, 'a'..'f' for choices) to a contribution. */
export type AnswerWeights = Record<string, number>;

export interface QuestionOption {
  key: string; // 'a' | 'b' | 'c' | 'd' | ...
  label: string;
  emoji?: string;
}

export interface Question {
  id: string;
  category: QuestionCategory;
  /** `default` is always present; other keys are contextual variants. */
  variants: { default: string } & Record<string, string>;
  /** Free-form tag keys that activate a contextual variant. */
  trigger?: Record<string, string[]>; // variantKey -> tags that select it
  type: QuestionType;
  options?: QuestionOption[];
  /** Inverted scale questions (1 means strong agreement on the talent). */
  reverse?: boolean;
  weights: {
    talents: Partial<Record<TalentId, AnswerWeights>>;
    riasec: Partial<Record<RiasecAxis, AnswerWeights>>;
  };
}

export interface ScreeningAnswer {
  questionId: string;
  value: number | string; // number 1..5 for scales, string key for choices
}

export type ScoringAnswer = ScreeningAnswer;

export interface FreeformAnswer {
  text: string;
  tags: string[];
}

export interface TestAnswers {
  screening: ScreeningAnswer[];
  freeform: FreeformAnswer;
  scoring: ScoringAnswer[];
}

// --- Suggestion tags --------------------------------------------------------

export type SuggestionGroup = 'hobbies' | 'strengths' | 'fears' | 'goals';

export interface SuggestionTag {
  id: string;
  label: string;
  group: SuggestionGroup;
  /** Keys used to match question variant triggers. */
  keys: string[];
}

// --- Professions ------------------------------------------------------------

export type ProfessionTag =
  | 'creative'
  | 'high-income'
  | 'remote'
  | 'analytical'
  | 'social'
  | 'technical'
  | 'stable'
  | 'fast-growing';

export interface Profession {
  id: string;
  name: string;
  category: string;
  description: string;
  longDescription: string;
  riasecCode: string;
  requiredTalents: TalentId[];
  niceTalents: TalentId[];
  tags: ProfessionTag[];
  skills: string[];
  averageSalaryKZ: string;
  averageSalaryCIS: string;
  futureOutlook: string;
  universities: string[];
  entSubjects: string[];
  realStory?: string;
}

export interface ProfessionMatch {
  profession: Profession;
  matchPercent: number; // 0..100
  riasecMatch: number; // 0..1
  talentMatch: number; // 0..1
}

// --- Spheres ----------------------------------------------------------------

export interface Sphere {
  id: string;
  name: string;
  icon: string;
  /** Talents that signal affinity for this sphere. */
  talents: TalentId[];
  riasec: RiasecAxis[];
}

export interface SphereScore {
  sphere: Sphere;
  percent: number; // 0..100
}

// --- Archetype --------------------------------------------------------------

export interface Archetype {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  color: string;
  /** Pair of dominant domains that select this archetype. */
  domains: [TalentDomain, TalentDomain];
}

// --- Recommendations --------------------------------------------------------

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  icon: string;
  checklist: string[];
}

export interface RecommendationRule {
  id: string;
  /** Returns true when the recommendation applies to the given report inputs. */
  applies: (ctx: RecommendationContext) => boolean;
  recommendation: Recommendation;
  priority: number; // lower = shown first
}

export interface RecommendationContext {
  topTalents: TalentResult[]; // top 15
  riasec: RiasecResult;
  domainStrength: Record<TalentDomain, number>;
  freeformTags: string[];
}

// --- Report -----------------------------------------------------------------

export interface ReportStats {
  thinking: number;
  energy: number;
  communication: number;
  will: number;
}

export interface Report {
  id: string;
  generatedAt: string;
  archetype: Archetype;
  summary: string;
  stats: ReportStats;
  talents: TalentResult[]; // all 60, sorted desc
  riasec: RiasecResult;
  professions: ProfessionMatch[]; // top 15, sorted desc
  spheres: SphereScore[]; // all spheres, sorted desc
  recommendations: Recommendation[];
  freeform: FreeformAnswer;
}

// --- User -------------------------------------------------------------------

export type Gender = 'male' | 'female' | 'prefer_not_to_say';
export type SocialStatus = 'school' | 'student' | 'other';
export type UserVersion = 'school' | 'student';

export interface User {
  id: string;
  email: string;
  name: string;
  age: number | null;
  gender: Gender | null;
  socialStatus: SocialStatus | null;
  userVersion: UserVersion;
  expectations: string[];
  onboardingComplete: boolean;
  createdAt: string;
}

// --- Feedback ---------------------------------------------------------------

export interface Feedback {
  id: string;
  rating: number; // 1..5
  liked: string[];
  missing: string[];
  comment: string;
  createdAt: string;
}
