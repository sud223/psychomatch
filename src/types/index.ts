// Navigation types
export type RootStackParamList = {
  Splash: undefined;
  Intro: undefined;
  Auth: undefined;
  Main: undefined;
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  Profile: undefined;
  Quiz: undefined;
  Settings: undefined;
};

// User types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

// Auth types
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

// Quiz types
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

