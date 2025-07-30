import { Quiz } from '../types';

export const mockQuiz: Quiz = {
  id: '1',
  title: 'React Native Basics',
  description: 'Test your knowledge of React Native fundamentals',
  questions: [
    {
      id: '1',
      question: 'What is React Native?',
      options: [
        'A web framework',
        'A mobile app development framework',
        'A database system',
        'A testing library',
      ],
      correctAnswer: 1,
    },
    {
      id: '2',
      question: 'Which company developed React Native?',
      options: ['Google', 'Apple', 'Facebook (Meta)', 'Microsoft'],
      correctAnswer: 2,
    },
    {
      id: '3',
      question:
        'What language is primarily used for React Native development?',
      options: ['Java', 'Swift', 'JavaScript/TypeScript', 'Python'],
      correctAnswer: 2,
    },
    {
      id: '4',
      question: 'Which component is used for navigation in React Native?',
      options: ['Navigator', 'Router', 'React Navigation', 'NavController'],
      correctAnswer: 2,
    },
    {
      id: '5',
      question: 'What is JSX?',
      options: [
        'A database query language',
        'A syntax extension for JavaScript',
        'A testing framework',
        'A styling language',
      ],
      correctAnswer: 1,
    },
  ],
};
