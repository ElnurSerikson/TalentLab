import type {
  AnswerWeights,
  Question,
  QuestionCategory,
  QuestionType,
  RiasecAxis,
  TalentId,
} from '@/domain/types';

type TalentWeightMap = Partial<Record<TalentId, number>>;
type RiasecWeightMap = Partial<Record<RiasecAxis, number>>;

/** Build per-level contribution for a 1..5 scale from a base weight. */
function scaleLevels(base: number, reverse: boolean): AnswerWeights {
  const fwd: AnswerWeights = {
    '1': base * 0,
    '2': base * 0.25,
    '3': base * 0.5,
    '4': base * 0.75,
    '5': base * 1,
  };
  if (!reverse) return fwd;
  return {
    '1': base * 1,
    '2': base * 0.75,
    '3': base * 0.5,
    '4': base * 0.25,
    '5': base * 0,
  };
}

export interface ScaleSpec {
  id: string;
  category: QuestionCategory;
  text: string;
  variants?: Record<string, string>;
  trigger?: Record<string, string[]>;
  reverse?: boolean;
  talents: TalentWeightMap;
  riasec?: RiasecWeightMap;
}

export function scaleQ(spec: ScaleSpec): Question {
  const talents: Question['weights']['talents'] = {};
  for (const [id, base] of Object.entries(spec.talents)) {
    if (base == null) continue;
    talents[id] = scaleLevels(base, spec.reverse ?? false);
  }
  const riasec: Question['weights']['riasec'] = {};
  if (spec.riasec) {
    for (const [axis, base] of Object.entries(spec.riasec) as [RiasecAxis, number][]) {
      riasec[axis] = scaleLevels(base, spec.reverse ?? false);
    }
  }
  return {
    id: spec.id,
    category: spec.category,
    type: 'scale1to5',
    reverse: spec.reverse,
    variants: { default: spec.text, ...spec.variants },
    trigger: spec.trigger,
    weights: { talents, riasec },
  };
}

export interface ChoiceOptionSpec {
  key: string;
  label: string;
  emoji?: string;
  talents?: TalentWeightMap;
  riasec?: RiasecWeightMap;
}

export interface ChoiceSpec {
  id: string;
  category: QuestionCategory;
  text: string;
  variants?: Record<string, string>;
  trigger?: Record<string, string[]>;
  type?: QuestionType;
  options: ChoiceOptionSpec[];
}

export function choiceQ(spec: ChoiceSpec): Question {
  const talents: Question['weights']['talents'] = {};
  const riasec: Question['weights']['riasec'] = {};

  for (const opt of spec.options) {
    if (opt.talents) {
      for (const [id, w] of Object.entries(opt.talents)) {
        if (w == null) continue;
        (talents[id] ??= {})[opt.key] = w;
      }
    }
    if (opt.riasec) {
      for (const [axis, w] of Object.entries(opt.riasec) as [RiasecAxis, number][]) {
        (riasec[axis] ??= {})[opt.key] = w;
      }
    }
  }

  return {
    id: spec.id,
    category: spec.category,
    type: spec.type ?? 'choice4',
    variants: { default: spec.text, ...spec.variants },
    trigger: spec.trigger,
    options: spec.options.map((o) => ({ key: o.key, label: o.label, emoji: o.emoji })),
    weights: { talents, riasec },
  };
}
