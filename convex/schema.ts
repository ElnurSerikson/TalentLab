import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

// Анонимный сбор данных по индустрии: каждый завершённый базовый тест и каждый
// фидбек пишутся сюда. Авторизация (Convex Auth) добавится следующим шагом —
// тогда добавим поле userId и привяжем записи к аккаунту.
export default defineSchema({
  baseRuns: defineTable({
    clientId: v.string(), // анонимный id устройства (localStorage)
    name: v.optional(v.string()),
    age: v.optional(v.number()),
    gender: v.optional(v.string()),
    userVersion: v.optional(v.string()),
    answers: v.array(
      v.object({
        questionId: v.string(),
        value: v.union(v.number(), v.string()),
      }),
    ),
    archetypeId: v.string(),
    archetypeName: v.string(),
    domains: v.array(
      v.object({ domain: v.string(), percent: v.number() }),
    ),
    topTraits: v.array(
      v.object({ id: v.string(), name: v.string(), percent: v.number() }),
    ),
    aiReadiness: v.number(),
    createdAt: v.number(),
  })
    .index('by_client', ['clientId'])
    .index('by_archetype', ['archetypeId']),

  feedback: defineTable({
    clientId: v.string(),
    rating: v.number(),
    liked: v.array(v.string()),
    missing: v.array(v.string()),
    comment: v.string(),
    createdAt: v.number(),
  }),
});
