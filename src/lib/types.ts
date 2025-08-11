export interface AIPrompt {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  isPremium: boolean;
  author: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  uses: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  type: 'ChatGPT' | 'Claude' | 'Midjourney' | 'DALL-E' | 'Stable Diffusion' | 'Universal';
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  count: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  isPremium: boolean;
  createdAt: string;
  favoritePrompts: string[];
}
