import React, { Component } from 'react'
import axios from 'axios'

class QuestionForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      questionPrompt: this.props.question.questionPrompt,
      answerInput: this.props.question.answerInput
    }
  }

  handleInput = (e) => {
    this.props.resetNotification()
    this.setState({[e.target.name]: e.target.value})
  }

  handleBlur = () => {
    const question = {
      questionPrompt: this.state.questionPrompt,
      correctAnswer: this.state.answerInput
    }

    axios.post(
      `http://localhost:3001/questions/${this.props.question.id}`,
      {
        question: question
      })
      .then(response => {
        console.log(response)
      })
      .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="tile">
        <form onBlur={this.handleBlur} >
          <input className='input' type="text"
            name ="question" placeholder='Enter a question'
            value={this.state.questionPrompt} onChange={this.handleInput}/>
          <textarea className='input'
            name="answer" placeholder='Answer the question here.'
            value={this.state.answerInput} onChange={this.handleInput}>
          </textarea>
          <button type="submit" className="btn btn-success">
          Add question
        </button>
        </form>
      </div>
    );
  }
}

export default QuestionForm