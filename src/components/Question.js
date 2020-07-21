import React, { Component } from 'react'

class Question extends Component {
// gets the actual question
  handleClick = () => {
    this.props.onClick(this.props.question.id)
  }

  // todo: make this delete the question
  handleDelete = () => {
    this.props.onDelete(this.props.question.id)
  }

  render () {
    return(
      <div className="question">
        <h4 onClick={this.handleClick}>
          {this.props.question.questionPrompt}
        </h4>
        <p className="answerInput">
          {this.props.question.answerInput}
        </p>
        {/* TODO: implement delete */}
        <span className="deleteButton" onClick={this.handleDelete}>
          Delete
        </span>
      </div>
    )
  }
}

export default Question