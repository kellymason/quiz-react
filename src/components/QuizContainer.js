import React, { Component } from 'react'
import axios from 'axios'
import Question from './Question'
import update from 'immutability-helper'
import QuestionForm from './QuestionForm'

class QuizContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      questions: [],
      editingQuestionId: null,
      notification: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/questions')
    .then(response => {
      console.log(response)
      this.setState({questions: response.data})
    })
    .catch(error => console.log(error))
  }

  addNewQuestion = () => {
    console.log(`adding new question!`)
    axios.post(
      'http://localhost:3001/questions',
      { question:
        {
          questionPrompt: '',
          answerInput: ''
        }
      }
    )
    .then(response => {
      console.log(response)
      // Make a copy of this.state.entries
      // then use splice to insert the new entry at the 0th index
      const questions = update(this.state.questions, {
        $splice: [[0, 0, response.data]]
      })
      this.setState({
        questions: questions,
        editingQuestionId: response.data.id
      })
    })
    .catch(error => console.log(error))
  }

  updateQuestion = (question) => {
    console.log(JSON.stringify(question));
    const questionIndex = this.state.questions.findIndex(x => x.id === question.id)
    console.log(`questionIndex: ${questionIndex}`)
    const questions = update(this.state.questions, {
      [questionIndex] : {$set: question}
    })
    this.setState({
      questions: questions,
      notification: 'All changes saved'
    })
  }

  resetNotification = () => {
    this.setState({notification: ''})
  }

  enableEditing = (id) => {
    this.setState({editingQuestionId: id},
      () => { this.title.focus() })
  }

  // deleteQuestion = (id) => {
  //   axios.delete(`http://localhost:3001/questions/${id}`)
  //   .then(response => {
  //     const entryIndex = this.state.questions.findIndex(x => x.id === id)
  //     const questions = update(this.state.questions, { $splice: [[questionIndex, 1]]})
  //     this.setState({questions: questions})
  //   })
  //   .catch(error => console.log(error))
  // }

  render() {
    return (
      <div>
        <button className="newQuestionButton" onClick={this.addNewQuestion} >
          New question
        </button>
        <span className="notification">
          {this.state.notification}
        </span>
        
        {this.state.questions.map((question) => {
          if(this.state.editingQuestionId === question.id) {
            return(<QuestionForm question={question} key={question.id}
                    addNewQuestion={this.updateQuestion}
                    resetNotification={this.resetNotification} />)
          } else {
            return(<Question question={question} key={question.id} />)
          }
        })}
      </div>
    );
  }

}

export default QuizContainer