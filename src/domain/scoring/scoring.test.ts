import { describe, expect, it } from 'vitest';
import type { ScreeningAnswer, TestAnswers } from '@/domain/types';
import { SCREENING_QUESTIONS } from '@/data/screeningQuestions';
import { SCORING_QUESTIONS } from '@/data/scoringQuestions';
import { calculateTalents } from './calculateTalents';
import { calculateRiasec } from './calculateRiasec';
import { matchProfessions } from './matchProfessions';
import { buildReport } from './buildReport';

type Bank = typeof SCREENING_QUESTIONS;

/** Answer every question: scales -> `scaleValue`, choices -> the given key. */
function answerBank(bank: Bank, scaleValue: number, choiceKey: string): ScreeningAnswer[] {
  return bank.map((q) => ({
    questionId: q.id,
    value: q.type === 'scale1to5' ? scaleValue : choiceKey,
  }));
}

function makeAnswers(scaleValue: number, choiceKey: string, tags: string[] = []): TestAnswers {
  return {
    screening: answerBank(SCREENING_QUESTIONS, scaleValue, choiceKey),
    scoring: answerBank(SCORING_QUESTIONS, scaleValue, choiceKey),
    freeform: { text: '', tags },
  };
}

describe('calculateTalents', () => {
  it('returns all 60 talents ranked with bounded percentages', () => {
    const results = calculateTalents(makeAnswers(3, 'a'));
    expect(results).toHaveLength(60);
    expect(results[0].rank).toBe(1);
    expect(results[59].rank).toBe(60);
    for (const r of results) {
      expect(r.percent).toBeGreaterThanOrEqual(0);
      expect(r.percent).toBeLessThanOrEqual(100);
    }
    // sorted descending
    for (let i = 1; i < results.length; i++) {
      expect(results[i - 1].percent).toBeGreaterThanOrEqual(results[i].percent);
    }
  });

  it('rewards analytical answers with high thinking talents', () => {
    // choosing 'a' (logical option) on choices + max on scales
    const results = calculateTalents(makeAnswers(5, 'a'));
    const analyst = results.find((r) => r.talent.id === 'analyst');
    const logician = results.find((r) => r.talent.id === 'logician');
    expect(analyst!.percent).toBeGreaterThan(40);
    expect(logician!.percent).toBeGreaterThan(40);
  });
});

describe('calculateRiasec', () => {
  it('produces a 3-letter code and bounded axis scores', () => {
    const riasec = calculateRiasec(makeAnswers(4, 'a'));
    expect(riasec.code).toHaveLength(3);
    for (const v of Object.values(riasec.scores)) {
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThanOrEqual(100);
    }
  });

  it('analytical answers lean Investigative (I)', () => {
    const riasec = calculateRiasec(makeAnswers(5, 'a'));
    expect(riasec.code.includes('I')).toBe(true);
  });
});

describe('matchProfessions', () => {
  it('returns professions sorted by match percent', () => {
    const talents = calculateTalents(makeAnswers(5, 'a'));
    const riasec = calculateRiasec(makeAnswers(5, 'a'));
    const matches = matchProfessions(talents, riasec);
    expect(matches.length).toBeGreaterThan(10);
    for (let i = 1; i < matches.length; i++) {
      expect(matches[i - 1].matchPercent).toBeGreaterThanOrEqual(matches[i].matchPercent);
    }
    for (const m of matches) {
      expect(m.matchPercent).toBeGreaterThanOrEqual(0);
      expect(m.matchPercent).toBeLessThanOrEqual(100);
    }
  });
});

describe('buildReport', () => {
  it('assembles a complete report', () => {
    const report = buildReport(makeAnswers(4, 'b', ['games', 'creative']));
    expect(report.talents).toHaveLength(60);
    expect(report.professions).toHaveLength(15);
    expect(report.spheres.length).toBeGreaterThan(0);
    expect(report.recommendations.length).toBeGreaterThan(0);
    expect(report.recommendations.length).toBeLessThanOrEqual(5);
    expect(report.archetype).toBeTruthy();
    expect(report.summary.length).toBeGreaterThan(10);
    for (const key of ['thinking', 'energy', 'communication', 'will'] as const) {
      expect(report.stats[key]).toBeGreaterThanOrEqual(0);
      expect(report.stats[key]).toBeLessThanOrEqual(100);
    }
  });

  it('is deterministic for identical inputs (except id/date)', () => {
    const a = buildReport(makeAnswers(5, 'a'));
    const b = buildReport(makeAnswers(5, 'a'));
    expect(a.talents.map((t) => t.talent.id)).toEqual(b.talents.map((t) => t.talent.id));
    expect(a.archetype.id).toBe(b.archetype.id);
  });
});
