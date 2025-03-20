import {Component} from 'react'
import './App.css'

const colors = ['blue', 'green', 'red', 'pink', 'yellow', 'orange']

class App extends Component {
  state = {
    balls: [], // Stores falling balls
    score: 0, // Keeps track of score
  }

  componentDidMount() {
    this.ballInterval = setInterval(() => {
      this.addNewBall()
    }, 1000)
    this.fallInterval = setInterval(() => {
      this.moveBallsDown()
    }, 500)
  }

  componentWillUnmount() {
    clearInterval(this.ballInterval) // Clear the add ball interval
    clearInterval(this.fallInterval) // Clear the move ball interval
  }

  // 3. **Function to add a new ball**
  addNewBall = () => {
    const newBall = {
      id: Date.now(),
      color: colors[Math.floor(Math.random() * 6)],
      x: Math.floor(Math.random() * 90),
      y: 0,
    }

    this.setState(prevState => ({
      balls: [...prevState.balls, newBall],
    }))
  }

  // 4. **Function to move all balls down**
  moveBallsDown = () => {
    this.setState(prevState => ({
      balls: prevState.balls
        .map(ball => ({...ball, y: ball.y + 3}))
        .filter(ball => ball.y < 99),
    }))
  }

  // 5. **Function to handle clicking (catching) a ball**
  catchBall = id => {
    this.setState(prevState => ({
      balls: prevState.balls.filter(ball => ball.id !== id),
      score: prevState.score + 1,
    }))
  }

  render() {
    const {score, balls} = this.state
    return (
      <div className="container">
        <h1 className="title">Catch the Color 🎨</h1>
        <p className="score">Score: {score}</p>
        <div className="game-area">
          {balls.map(ball => (
            <button
              key={ball.id}
              type="button"
              className="ball"
              style={{
                backgroundColor: ball.color,
                left: `${ball.x}%`,
                top: `${ball.y}%`,
              }}
              onClick={() => this.catchBall(ball.id)}
            >
              Catch Me..!
            </button>
          ))}
        </div>
        <p className="instructions">Click the falling balls to score points</p>
      </div>
    )
  }
}

export default App
