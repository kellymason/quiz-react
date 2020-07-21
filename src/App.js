import React, { Component } from 'react';
import './App.css';
import QuizContainer from './components/QuizContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">My Quiz</h1>
        </header>
        <QuizContainer />
      </div>
    );
  }
}

export default App;