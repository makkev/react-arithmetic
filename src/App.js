import React, { Component } from 'react';
import serializeForm from 'form-serialize'
import './App.css';

class App extends Component {
  quiz = [
      {
        question: '2 x 2 = ',
        correctAnswer: 4,
        answerGiven: '',
        correct: false,
        answered: false,
      },
      {
        question: '2 x 3 = ',
        correctAnswer: 6,
        answerGiven: '',
        correct: false,
        answered: false,
      },
      {
        question: '2 x 4 = ',
        correctAnswer: 8,
        answerGiven: '',
        correct: false,
        answered: false,
      }
  ]

  state = {
    questions: [...this.quiz],
    total: 3,
    score: 0,
    currentQuestion: 0,
    msg: '',
    submitButtonOn: true,
  }

  handleSubmit = e => {
    e.preventDefault();
    const values = serializeForm(e.target, { hash: true })
    console.log(values);
    console.log(this.state)
    this.setState({ submitButtonOn: false })
    if (parseInt(values.answer) === this.state.questions[this.state.currentQuestion].correctAnswer) {
      // this.setState({ currentQuestion: this.state.currentQuestion + 1 })
      this.setState({ msg: 'Correct!!!'})
      console.log('correct');
    }
    else {
      this.setState({ msg: 'Wrong!!!'})
      console.log('wrong');
    } 
  }  

  nextQuestion = e => {
    this.setState({ msg: '' })
    if (this.state.currentQuestion + 1 < this.state.total) {
      this.setState({ currentQuestion: this.state.currentQuestion + 1 })
      this.setState({ submitButtonOn: true })
      this.inputAnswer.value = '';
    } else {
      this.setState({ msg: 'All done' })
    }
    console.log(this.state)

  }

  render() {
    return (
      <div className="container">
        <p>{this.state.currentQuestion + 1}/{this.state.total}</p>
        <form className="form-inline" onSubmit={this.handleSubmit} autoComplete="off" >
          {this.state.questions[this.state.currentQuestion].question}
          <input 
            type="text"
            name="answer"
            readOnly={!this.state.submitButtonOn}
            ref={a => this.inputAnswer = a}
            autoFocus
          />
          {this.state.submitButtonOn && <button>Submit</button> }
        </form>
        {this.state.msg}
        <p></p>
        {!this.state.submitButtonOn && <button onClick={this.nextQuestion}>Next</button>}
        
      </div>
    )
  }
}

export default App;
