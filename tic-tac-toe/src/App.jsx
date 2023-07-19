import { Component } from 'react'
import { Game } from './components/TicTacToeGame'

export class App extends Component {
  render() {
    return (
      <>
        <div><Game /></div>
      </>
    )
  }
}

export default App