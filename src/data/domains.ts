import type { TalentDomain } from '@/domain/types';

export interface DomainMeta {
  id: TalentDomain;
  name: string;
  short: string;
  color: string;
  icon: string;
}

export const DOMAINS: Record<TalentDomain, DomainMeta> = {
  thinking: {
    id: 'thinking',
    name: 'Мышление',
    short: 'Как ты обрабатываешь информацию',
    color: '#7C3AED',
    icon: 'Brain',
  },
  creativity: {
    id: 'creativity',
    name: 'Творчество',
    short: 'Как ты создаёшь новое',
    color: '#F59E0B',
    icon: 'Sparkles',
  },
  people: {
    id: 'people',
    name: 'Люди',
    short: 'Как ты взаимодействуешь',
    color: '#10B981',
    icon: 'Users',
  },
  action: {
    id: 'action',
    name: 'Действие',
    short: 'Как ты добиваешься результата',
    color: '#F43F5E',
    icon: 'Rocket',
  },
  digital: {
    id: 'digital',
    name: 'Цифровая адаптивность',
    short: 'Как ты живёшь в современном мире',
    color: '#0EA5E9',
    icon: 'Cpu',
  },
};

export const DOMAIN_ORDER: TalentDomain[] = [
  'thinking',
  'creativity',
  'people',
  'action',
  'digital',
];
