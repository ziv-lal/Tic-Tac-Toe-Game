import './TicTacToeGame.css'
import { useState } from 'react'
import reactIcon from '../assets/react.svg'

function TicTacToeGameSquare({ mark, value, onSquareClick }) {
    return (
        <button 
        className={`square ${mark}`}
        onClick={onSquareClick}
        > 
            { value }
        </button>
    )
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[b] && squares[c]) {
            var tempA = Object.getOwnPropertyDescriptor(squares[a], 'props').value.alt;
            var tempB = Object.getOwnPropertyDescriptor(squares[b], 'props').value.alt;
            var tempC = Object.getOwnPropertyDescriptor(squares[c], 'props').value.alt;
            if (tempA && tempA == tempB && tempA == tempC) {
                return [a, b, c];
            }
        }
    }
    return null;
}

function TicTacToeGameBoard({ reactIsNext, squares, onPlay }) {
    const reactIconImg = <img src={reactIcon} alt="react" />;
    const viteIconImg = <img src="vite.svg" alt="vite" />;

    var lights = Array(9).fill(null);

    function handleClick(i) {
        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        const nextSquares = squares.slice();

        if (reactIsNext) {
            nextSquares[i] = reactIconImg;
        } else {
            nextSquares[i] = viteIconImg;
        }
        onPlay(nextSquares);
    }

    var winner = calculateWinner(squares);
    let status;
    let finalStatus;
    if(winner) {
        status = 'Winner: ';
        finalStatus = '🎉 🎉 🎉';
        lights[winner[0]] = 'light';
        lights[winner[1]] = 'light';
        lights[winner[2]] = 'light';
        winner = squares[winner[0]];
    } else {
        winner = (reactIsNext ? reactIconImg : viteIconImg);
        status = 'Next player: ';
        finalStatus = '🤪 🤪 🤪';
    }

    return (
        <>
            <div className='status'>{status}&nbsp;{winner}</div>
            <div className='board-row'>
                <TicTacToeGameSquare mark={lights[0]} value={squares[0]} onSquareClick={() => handleClick(0)} />
                <TicTacToeGameSquare mark={lights[1]} value={squares[1]} onSquareClick={() => handleClick(1)}/>
                <TicTacToeGameSquare mark={lights[2]} value={squares[2]} onSquareClick={() => handleClick(2)}/>
            </div>
            <div className='board-row'>
                <TicTacToeGameSquare mark={lights[3]} value={squares[3]} onSquareClick={() => handleClick(3)}/>
                <TicTacToeGameSquare mark={lights[4]} value={squares[4]} onSquareClick={() => handleClick(4)}/>
                <TicTacToeGameSquare mark={lights[5]} value={squares[5]} onSquareClick={() => handleClick(5)}/>
            </div>
            <div className='board-row'>
                <TicTacToeGameSquare mark={lights[6]} value={squares[6]} onSquareClick={() => handleClick(6)}/>
                <TicTacToeGameSquare mark={lights[7]} value={squares[7]} onSquareClick={() => handleClick(7)}/>
                <TicTacToeGameSquare mark={lights[8]} value={squares[8]} onSquareClick={() => handleClick(8)}/>
            </div>
            <hr />
            <div className='final-status'>{finalStatus}</div>
        </>
    )
}

export function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currenMove, setCurrentMove] = useState(0);
    const reactIsNext = currenMove % 2 === 0;
    const currentSquares = history[currenMove];

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currenMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    const moves = history.map((squares, move) => {
        let description;
        if (move > 0) {
            description = 'Go to move #' + move;
        } else {
            description = 'Go to game start';
        }
        return (
            <>
                <li key={move}>
                    <button className='step-btn' onClick={() => jumpTo(move)}>{description}</button>
                </li>
            </>
        )
    });

    return (
        <div className='game'>
            <div className='game-board'>
                <TicTacToeGameBoard reactIsNext={reactIsNext} squares={currentSquares} onPlay={handlePlay}/>
            </div>
            <div className='game-info'>
                <ol>{moves}</ol>
            </div>
        </div>
    )
}

export default Game