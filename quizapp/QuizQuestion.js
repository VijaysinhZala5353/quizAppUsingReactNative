import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const QuizQuestion = ({ question, onAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerSubmit = () => {
    if (selectedAnswer === question.answerIndex) {
      onAnswer(true);
    } else {
      onAnswer(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question.question}</Text>
      {question.options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.option}
          onPress={() => setSelectedAnswer(index)}
        >
          <Text>{option}</Text>
          {selectedAnswer === index && <Text>✓</Text>}
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleAnswerSubmit}
        disabled={selectedAnswer === null}
      >
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  question: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default QuizQuestion;

