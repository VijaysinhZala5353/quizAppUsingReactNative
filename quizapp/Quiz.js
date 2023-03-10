import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, AsyncStorage } from 'react-native';
import QuizQuestion from './QuizQuestion';
import HighScore from './HighScore';

const questions = [
  {
    question: 'What is the capital of France?',
    options: ['London', 'Paris', 'Berlin', 'Madrid'],
    answerIndex: 1
  },
  {
    question: 'What is the largest mammal in the world?',
    options: ['Elephant', 'Giraffe', 'Whale', 'Rhinoceros'],
    answerIndex: 2
  },
    {
    question: 'What is the capital of France?',
    options: ['London', 'Paris', 'Berlin', 'Madrid'],
    answerIndex: 1
  },
  {
    question: 'What is the largest mammal in the world?',
    options: ['Elephant', 'Giraffe', 'Whale', 'Rhinoceros'],
    answerIndex: 2
  },
    {
    question: 'What is the capital of France?',
    options: ['London', 'Paris', 'Berlin', 'Madrid'],
    answerIndex: 1
  }
];

const Quiz = () => {
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    
    // Load the high scores from AsyncStorage on component mount
    AsyncStorage.getItem('highScores').then((storedHighScores) => {
      if (storedHighScores) {
        setHighScores(JSON.parse(storedHighScores));
      }
    });
  }, []);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

const handleQuizEnd = () => {
  const today = new Date().toLocaleDateString();
  const newHighScore = { date: today, score };
  const updatedHighScores = [...highScores, newHighScore];
  updatedHighScores.sort((a, b) => b.score - a.score);
  updatedHighScores.splice(5);
  AsyncStorage.setItem('highScores', JSON.stringify(updatedHighScores)).then(() => {
    setHighScores(updatedHighScores);
  });
  setScore(0); // Reset score to 0
  setCurrentQuestionIndex(0); // Reset current question index to 0
};


  return (
    <View style={styles.container}>
      {currentQuestionIndex < questions.length ? (
        <QuizQuestion
          question={questions[currentQuestionIndex]}
          onAnswer={handleAnswer}
          score={score}
        />
      ) : (
        <View>
          <Text style={styles.finalScore}>Final Score: {score}</Text>
          {highScores.length > 0 && (
            <>
              <Text style={styles.highScoresTitle}>High Scores</Text>
              {highScores.map((highScore, index) => (
                <HighScore
                  key={index}
                  rank={index + 1}
                  date={highScore.date}
                  score={highScore.score}
                />
              ))}
            </>
          )}
          {!highScores.length && (
            <Text style={styles.noHighScores}>No high scores yet</Text>
          )}
          <Text style={styles.instructions}>Press button to end quiz</Text>
          <View style={styles.endQuizButtonContainer}>
            <Text style={styles.endQuizButton} onPress={handleQuizEnd}>Start Quiz</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  finalScore: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  highScoresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noHighScores: {
    fontSize: 18,
    marginBottom: 10,
  },
  endQuizButtonContainer: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  endQuizButton: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Quiz;
