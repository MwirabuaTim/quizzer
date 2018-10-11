// This component controlls the logic for the Trivia portion of the app,
// The trivia is either 'in progress' or 'finished', represented by two different presentational components
import React from 'react';
import PropTypes from 'prop-types'
import { View } from 'react-native';

// utilities
import { shuffleArray } from '../utilities/arrayHelpers';

// components
import TriviaFinishedComponent from '../components/TriviaFinishedComponent';
import TriviaInProgressComponent from '../components/TriviaInProgressComponent';
// we use local state in this component because these states are not use anywhere else and nothing derives from them
// see http://redux.js.org/docs/faq/OrganizingState.html#organizing-state-only-redux-state
class TriviaComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentQuestionIndex: 0,
      answeredState: false, // in this state the correct question is highlighted
    }
    this.createAnswersArray = this.createAnswersArray.bind(this);
    this.finishQuiz = this.finishQuiz.bind(this);
    this.answerQuestion = this.answerQuestion.bind(this);
  }
  componentWillMount(){
    // you should use this to store things that do NOT trigger a rerender
    // when we creata a new answer array and reshuffle it, we do not want to rerender the component
    this.answers = this.createAnswersArray(this.props.triviaQuestions[this.state.currentQuestionIndex])
  }
  componentWillUpdate(nextProps, nextState){
    if(this.state.currentQuestionIndex !== nextState.currentQuestionIndex){
      let nextQuestion = this.props.triviaQuestions[nextState.currentQuestionIndex]
      if(nextQuestion){
        this.answers = this.createAnswersArray(nextQuestion);
      }
      else {
        this.props.actions.endTrivia(this.props.playerScore, this.props.difficulty, this.props.triviaQuestions.length)
      }
    }
  }
  createAnswersArray(question){
    const correctAnswer = question.correct_answer;
    const incorrectAnswers = question.incorrect_answers;

    // structure
    // correct_answer: ''
    // incorrect_answers: [{0: '', 1: '', 2: ''}]
    // do not mutate the other arrays
    const answerArray = [...incorrectAnswers, correctAnswer].map((answer, i) => {
      answer = { answerText: answer, selected: false }
      if(i === 3){
        answer.isCorrect = true
      } else {
        answer.isCorrect = false
      }
      return answer
    });

    //shuffle
    shuffleArray(answerArray);

    return answerArray;
  }
  answerQuestion(answer){
    answer.selected = true
    if(answer.isCorrect){
      this.props.actions.addToScore()
    }
    this.setState({answeredState: true})
    setTimeout(() => {
      this.nextQuestion()
    }, 100)
  }
  finishQuiz(){
    this.props.actions.endTrivia(this.props.playerScore, this.props.difficulty, this.state.currentQuestionIndex + 1)
  }
  nextQuestion(){
    const nextQuestionIndex = this.state.currentQuestionIndex + 1;
    this.setState({ currentQuestionIndex: nextQuestionIndex, answeredState: false})
  }
  render(){
    const currentQuestion = this.props.triviaQuestions[this.state.currentQuestionIndex];
    return (
      <View>
        { (currentQuestion && !this.props.triviaEnded) ?
          <TriviaInProgressComponent
            currentQuestion={currentQuestion}
            lastQuestion={this.state.currentQuestionIndex === this.props.triviaQuestions.length-1}
            questionProgress={`${this.state.currentQuestionIndex + 1} / ${this.props.triviaQuestions.length}`}
            answers={this.answers}
            answeredState={this.state.answeredState}
            finishQuiz={this.finishQuiz}
            answerQuestion={this.answerQuestion}
          />
        :
          <TriviaFinishedComponent
            playerScore={this.props.playerScore}
            numberOfAnsweredQuestions={this.state.currentQuestionIndex}
            handleOnPress={this.props.actions.restartTrivia}
          />
        }
      </View>
    )
  }
}

TriviaComponent.propTypes = {
  triviaQuestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  actions: PropTypes.object.isRequired,
  playerScore: PropTypes.number.isRequired,
  difficulty: PropTypes.string.isRequired,
  triviaEnded: PropTypes.bool.isRequired
}

export default TriviaComponent;
