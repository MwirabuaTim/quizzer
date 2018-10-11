import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';

const buttonStyle = (answeredState, answer) => {
  if(answeredState){
    let style = [styles.tile]
    if(answer.isCorrect){
      style.push(styles.correctAnswerTile)
    }
    else{
      style.push(styles.answerTile)
    }
    if (answer.selected){
      style.push(styles.selectedTile)
    }
    return style
  }
  return [styles.answerTile, styles.tile]
}
const TriviaInProgressComponent = ({ currentQuestion, lastQuestion, questionProgress, answers, answeredState, finishQuiz, answerQuestion }) => (
  <View>
    <View style={[styles.headerTile, styles.tile]}>
      <Text>Question: {questionProgress}</Text>
      <Text>Category: {currentQuestion.category}</Text>
    </View>
    <View style={[styles.questionArea, styles.tile]}>
      <Text>{currentQuestion.question}</Text>
    </View>
    <View>
      { answers.map((answer) => {
        return (
          <TouchableOpacity
            key={answer.answerText}
            disabled={answeredState}
            onPress={() => !answeredState && answerQuestion(answer)}
            style={buttonStyle(answeredState, answer)}
            activeOpacity={0.5}
          >
            <Text>{answer.answerText}</Text>
          </TouchableOpacity>
        )
      })}
      
      <View style={styles.finishQuiz}>
        <Button
          onPress={() => finishQuiz()}
          title={(lastQuestion && answeredState) ? "See Your Results" : 'Quit Quiz' }
          color={(lastQuestion && answeredState) ? "#841584" : '#ccc' }
        />
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  answerTile: {
    height: 50,
    backgroundColor: 'powderblue',
    borderColor: '#000033',
    borderWidth: 1,
  },
  selectedTile: {
    borderColor: 'red',
  },
  correctAnswerTile: {
    height: 50,
    backgroundColor: '#85d826',
    borderWidth: 1,
  },
  questionArea: {
    height: 100,
    backgroundColor: '#cddc39',
    borderColor: '#000033',
    borderWidth: 1,
  },
  headerTile: {
    backgroundColor: '#cddc39',
    borderColor: '#000033',
    borderWidth: 1,
    height: 50
  },
  tile: {
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  finishQuiz: {
    marginHorizontal: 5,
    marginVertical: 10,
  }
});

TriviaInProgressComponent.propTypes = {
  currentQuestion: PropTypes.object.isRequired,
  lastQuestion: PropTypes.bool.isRequired,
  questionProgress: PropTypes.string.isRequired,
  answers: PropTypes.arrayOf(PropTypes.object).isRequired,
  answeredState: PropTypes.bool.isRequired,
  finishQuiz: PropTypes.func.isRequired,
  answerQuestion: PropTypes.func.isRequired,
}

export default TriviaInProgressComponent;
