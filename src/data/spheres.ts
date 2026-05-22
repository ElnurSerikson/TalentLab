import type { Sphere } from '@/domain/types';

export const SPHERES: Sphere[] = [
  {
    id: 'it',
    name: 'IT и технологии',
    icon: 'Code2',
    talents: ['analyst', 'logician', 'tech-savvy', 'ai-native', 'systemizer', 'prototyper'],
    riasec: ['I', 'R', 'C'],
  },
  {
    id: 'design',
    name: 'Дизайн и креатив',
    icon: 'Palette',
    talents: ['designer', 'visual', 'creator', 'aesthete', 'content-maker'],
    riasec: ['A', 'I'],
  },
  {
    id: 'education',
    name: 'Образование',
    icon: 'GraduationCap',
    talents: ['mentor', 'communicator', 'empath', 'listener', 'expert'],
    riasec: ['S', 'A'],
  },
  {
    id: 'medicine',
    name: 'Медицина',
    icon: 'Stethoscope',
    talents: ['empath', 'analyst', 'researcher', 'disciplinator', 'defender'],
    riasec: ['I', 'S', 'R'],
  },
  {
    id: 'business',
    name: 'Бизнес и финансы',
    icon: 'Briefcase',
    talents: ['strategist', 'leader', 'negotiator', 'risk-taker', 'data-analyst', 'achiever'],
    riasec: ['E', 'C'],
  },
  {
    id: 'science',
    name: 'Наука',
    icon: 'FlaskConical',
    talents: ['researcher', 'analyst', 'conceptualist', 'skeptic', 'expert', 'logician'],
    riasec: ['I', 'R'],
  },
  {
    id: 'social',
    name: 'Социальная работа',
    icon: 'HeartHandshake',
    talents: ['empath', 'defender', 'diplomat', 'listener', 'mentor'],
    riasec: ['S', 'E'],
  },
  {
    id: 'production',
    name: 'Производство и инженерия',
    icon: 'Cog',
    talents: ['executor', 'organizer', 'systemizer', 'pragmatist', 'finisher'],
    riasec: ['R', 'C', 'I'],
  },
  {
    id: 'media',
    name: 'Медиа и коммуникации',
    icon: 'Radio',
    talents: ['storyteller', 'content-maker', 'showman', 'communicator', 'networker'],
    riasec: ['A', 'E', 'S'],
  },
  {
    id: 'public-service',
    name: 'Госслужба и право',
    icon: 'Landmark',
    talents: ['organizer', 'negotiator', 'defender', 'logician', 'leader'],
    riasec: ['E', 'S', 'C'],
  },
];
