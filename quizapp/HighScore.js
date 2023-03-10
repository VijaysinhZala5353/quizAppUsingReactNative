import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const HighScore = ({ rank, date, score }) => {
  return (
    <View style={styles.highScore}>
      <Text style={styles.rank}>{rank}.</Text>
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.score}>{score}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  highScore: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  rank: {
    fontSize: 18,
    marginRight: 10,
    width: 25,
  },
  date: {
    flex: 1,
    fontSize: 18,
    marginRight: 10,
  },
  score: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HighScore;
