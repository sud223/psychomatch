import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ProgressBarAndroid,
  Platform,
} from 'react-native';
import { COLORS, FONT_SIZES, SPACING } from '../constants';
import { apiService } from '../services/api';
import { QuizQuestion, Quiz } from '../types';

interface QuizScreenProps {
  navigation?: any;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ navigation }) => {
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuiz = async () => {
      const response = await apiService.getQuiz();
      if (response.success) {
        setCurrentQuiz(response.data);
      }
    };

    fetchQuiz();
  }, []);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < (currentQuiz?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishQuiz();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const finishQuiz = () => {
    if (!currentQuiz) return;

    let correctAnswers = 0;
    currentQuiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });

    const finalScore = Math.round((correctAnswers / currentQuiz.questions.length) * 100);
    setScore(finalScore);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setScore(0);
  };

  const handleBackToHome = () => {
    navigation?.navigate('Home');
  };

  if (!currentQuiz) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading quiz...</Text>
      </View>
    );
  }

  if (showResults) {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.resultsContainer}>
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsTitle}>Quiz Complete!</Text>
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreText}>{score}%</Text>
              <Text style={styles.scoreLabel}>Your Score</Text>
            </View>
          </View>

          <View style={styles.resultsDetails}>
            <Text style={styles.resultsSubtitle}>Results Breakdown</Text>
            {currentQuiz.questions.map((question, index) => (
              <View key={question.id} style={styles.resultItem}>
                <Text style={styles.resultQuestion}>
                  {index + 1}. {question.question}
                </Text>
                <View style={styles.resultAnswer}>
                  <Text style={[
                    styles.resultAnswerText,
                    selectedAnswers[index] === question.correctAnswer 
                      ? styles.correctAnswer 
                      : styles.incorrectAnswer
                  ]}>
                    Your answer: {question.options[selectedAnswers[index]] || 'Not answered'}
                  </Text>
                  {selectedAnswers[index] !== question.correctAnswer && (
                    <Text style={styles.correctAnswerText}>
                      Correct: {question.options[question.correctAnswer]}
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </View>

          <View style={styles.resultsActions}>
            <TouchableOpacity style={styles.retryButton} onPress={resetQuiz}>
              <Text style={styles.retryButtonText}>Try Again</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.homeButton} onPress={handleBackToHome}>
              <Text style={styles.homeButtonText}>Back to Home</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  if (!currentQuiz) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading quiz...</Text>
      </View>
    );
  }

  const currentQuestion = currentQuiz.questions[currentQuestionIndex];
  const progress = (currentQuestionIndex + 1) / currentQuiz.questions.length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.quizTitle}>{currentQuiz.title}</Text>
        <Text style={styles.questionCounter}>
          Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}
        </Text>
        <View style={styles.progressContainer}>
          {Platform.OS === 'android' ? (
            <ProgressBarAndroid
              styleAttr="Horizontal"
              indeterminate={false}
              progress={progress}
              color={COLORS.primary}
            />
          ) : (
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
            </View>
          )}
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
        </View>

        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                selectedAnswers[currentQuestionIndex] === index && styles.selectedOption
              ]}
              onPress={() => handleAnswerSelect(index)}
            >
              <View style={styles.optionContent}>
                <View style={[
                  styles.optionIndicator,
                  selectedAnswers[currentQuestionIndex] === index && styles.selectedIndicator
                ]} />
                <Text style={[
                  styles.optionText,
                  selectedAnswers[currentQuestionIndex] === index && styles.selectedOptionText
                ]}>
                  {option}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.navigation}>
        <TouchableOpacity
          style={[styles.navButton, currentQuestionIndex === 0 && styles.disabledButton]}
          onPress={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          <Text style={[
            styles.navButtonText,
            currentQuestionIndex === 0 && styles.disabledButtonText
          ]}>
            Previous
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.navButton,
            styles.nextButton,
            selectedAnswers[currentQuestionIndex] === undefined && styles.disabledButton
          ]}
          onPress={handleNextQuestion}
          disabled={selectedAnswers[currentQuestionIndex] === undefined}
        >
          <Text style={[
            styles.navButtonText,
            styles.nextButtonText,
            selectedAnswers[currentQuestionIndex] === undefined && styles.disabledButtonText
          ]}>
            {currentQuestionIndex === currentQuiz.questions.length - 1 ? 'Finish' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingText: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 100,
  },
  header: {
    padding: SPACING.lg,
    paddingTop: SPACING.xl,
    backgroundColor: COLORS.surface,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  quizTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  questionCounter: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  progressContainer: {
    height: 4,
  },
  progressBar: {
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
  },
  content: {
    flex: 1,
    padding: SPACING.lg,
  },
  questionContainer: {
    marginBottom: SPACING.xl,
  },
  questionText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
    lineHeight: 28,
  },
  optionsContainer: {
    gap: SPACING.md,
  },
  optionButton: {
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.border,
    padding: SPACING.md,
  },
  selectedOption: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary + '10',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.border,
    marginRight: SPACING.md,
  },
  selectedIndicator: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  optionText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    flex: 1,
  },
  selectedOptionText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: SPACING.lg,
    backgroundColor: COLORS.surface,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  navButton: {
    flex: 1,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  disabledButton: {
    opacity: 0.5,
  },
  navButtonText: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
  },
  nextButtonText: {
    color: COLORS.surface,
  },
  disabledButtonText: {
    color: COLORS.textSecondary,
  },
  resultsContainer: {
    padding: SPACING.lg,
  },
  resultsHeader: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  resultsTitle: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.lg,
  },
  scoreContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xl,
    borderRadius: 20,
  },
  scoreText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.surface,
  },
  scoreLabel: {
    fontSize: FONT_SIZES.md,
    color: COLORS.surface,
    opacity: 0.9,
  },
  resultsDetails: {
    marginBottom: SPACING.xl,
  },
  resultsSubtitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  resultItem: {
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: 8,
    marginBottom: SPACING.md,
  },
  resultQuestion: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  resultAnswer: {
    gap: SPACING.xs,
  },
  resultAnswerText: {
    fontSize: FONT_SIZES.sm,
  },
  correctAnswer: {
    color: COLORS.success,
  },
  incorrectAnswer: {
    color: COLORS.error,
  },
  correctAnswerText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.success,
    fontWeight: '500',
  },
  resultsActions: {
    gap: SPACING.md,
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  retryButtonText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.surface,
  },
  homeButton: {
    backgroundColor: COLORS.surface,
    paddingVertical: SPACING.md,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  homeButtonText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
  },
});

export default QuizScreen;

