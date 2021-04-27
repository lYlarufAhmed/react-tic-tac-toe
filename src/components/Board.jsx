import Square from "./Square";
import {useState} from "react";

export default function Board(props) {
    let [firstPlayer, changeFirstPlayer] = useState(true)
    // let [winner, changeWinner] = useState(0)
    let [cells, changeCells] = useState(new Array(9).fill(' '))
    let [gameOn, changeGameOn] = useState(0)
    let checkWinner = (cellValues) => {
        let playerStatus = []
        playerStatus.push(cellValues.slice(3).join(''))
        playerStatus.push(cellValues.slice(3, 6).join(''))
        playerStatus.push(cellValues.slice(6, 9).join(''))
        playerStatus.push(cellValues[0] + cellValues[3] + cellValues[6])
        playerStatus.push(cellValues[1] + cellValues[4] + cellValues[7])
        playerStatus.push(cellValues[2] + cellValues[5] + cellValues[8])
        playerStatus.push(cellValues[0] + cellValues[4] + cellValues[8])
        playerStatus.push(cellValues[2] + cellValues[4] + cellValues[6])

        if (playerStatus.includes('xxx')) return 2
        else if (playerStatus.includes('ooo')) return 1
        else return false
    }
    let handleClick = (i) => {
        if (cells[i] === ' ') {
            let copyCells = cells.slice()
            copyCells[i] = firstPlayer ? 'o' : 'x'
            changeCells(copyCells)
            let emptyCells = copyCells.reduce((acc, curr) => curr === ' ' ? acc + 1 : acc, 0)
            // console.log('winner', winner)
            let winner = checkWinner(copyCells)
            winner ? changeGameOn(winner) : emptyCells === 0 ? changeGameOn(-1) : changeGameOn(0)
            firstPlayer = changeFirstPlayer(!firstPlayer)
        }
    }
    return (
        <div className={'Main'}>
            <h2>{gameOn === 0 ? `Player ${firstPlayer ? 'o' : 'x'} turn` : gameOn === -1 ? 'Game End and Draw!' : gameOn === 1 ? 'Player o Wins!' : 'Player x Wins'}</h2>
            <div className={'Board'}>
                {cells.map((cell, i) => (<Square id={i} value={cells[i]} clickHandler={handleClick}/>))}
            </div>
        </div>
    )
}