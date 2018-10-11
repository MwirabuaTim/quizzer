import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Picker, Slider, Button, StyleSheet } from 'react-native';

//utilities
import { capitalizeString } from '../utilities/stringHelpers';

const TriviaSelectionComponent = ({ difficulty, difficultyLevels, actions, numberOfQuestions }) => (
  <View style={styles.mainView}>
    <Text style={styles.welcomeText}>Welcome to the Trivia App!</Text>
    <Text style={styles.introText}>Select the difficulty level and the number of questions to start playing!</Text>
    
    <View style={styles.settingsView}>
      <View style={styles.difficultyView}>
        <Text style={styles.difficultyTitle}>Difficulty: </Text>
        <Picker
          selectedValue={difficulty}
          style={styles.difficultyPicker}
          onValueChange={(newDifficulty) => actions.selectDifficulty(newDifficulty)}
        >
          {difficultyLevels.map((difficultyLevel) => {
            return (
              <Picker.Item key={difficultyLevel} label={capitalizeString(difficultyLevel)} value={difficultyLevel} />
            )
          })}
        </Picker>
      </View>
      <Text style={styles.noQuestionsText}>Number of questions: {numberOfQuestions}</Text>
      <Slider
        style={styles.noQuestionsSlider}
        value={numberOfQuestions}
        step={1}
        minimumValue={1}
        maximumValue={20}
        onValueChange={(value) => actions.selectNumberOfQuestions(value)}
      />
      <Button onPress={() => actions.requestFetch(difficulty, numberOfQuestions)} title="Start!" />
    </View>
  </View>
)

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: '#cddc39',
    flex: 1
    // fontSize: 18,
  },
  welcomeText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: '600',
    margin: 20
  },
  introText: {
    fontWeight: '300',
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 20
  },
  settingsView: {
    padding: 10
  },
  difficultyView: {
    flexDirection: 'row',
    // flex: 1, 
    // height: 50,
    // width: '100%'
  },
  difficultyTitle: {
    width: '50%',
    alignSelf: 'flex-start',
    fontSize: 18,
    lineHeight: 37,
    color: '#555'
  },
  difficultyPicker: {
    width: '50%',
    alignSelf: 'flex-end'
  },
  noQuestionsText: {
    fontWeight: '500',
  },
  noQuestionsSlider: {
    // width: '110%',
    // marginTop: 10,
    marginLeft: -15,
    paddingBottom: 25
  },
})

TriviaSelectionComponent.propTypes = {
  actions: PropTypes.object.isRequired,
  difficulty: PropTypes.string.isRequired,
  numberOfQuestions: PropTypes.number.isRequired,
  difficultyLevels: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default TriviaSelectionComponent;
