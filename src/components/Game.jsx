import Board from "./Board";
import {useState} from "react";
import History from "./History";
export default function Game(props){

    let [firstPlayer, changeFirstPlayer] = useState(true)
    let [gameOn, changeGameOn] = useState(0)
    let initialCells = new Array(9).fill(' ')
    let [cells, changeCells] = useState(initialCells)
    let [states, setStates] = useState([cells.slice()])
    let [stateIndexes, setStateIndexes] = useState(states.map((s, i)=>i))
    let [currentIndex, setCurrentIndex] = useState(0)
    let handleCellClick = (i, lastStateIndex) => {
        console.log('hnaling click with last StateIndex', lastStateIndex)
        if (cells[i] === ' ' && !gameOn) {
            let copyCells = cells.slice()
            copyCells[i] = firstPlayer ? 'o' : 'x'
            let copyStates = states.slice(0, lastStateIndex+1)
            // let copyStates = states.slice(lastStateIndex)
            copyStates.push(copyCells.slice())
            setStates(copyStates)
            setStateIndexes(copyStates.map(( s, i )=>i))
            changeCells(copyCells)
            let emptyCells = copyCells.reduce((acc, curr) => curr === ' ' ? acc + 1 : acc, 0)
            // console.log('winner', winner)
            let winner = checkWinner(copyCells)
            winner ? changeGameOn(winner) : emptyCells === 0 ? changeGameOn(-1) : changeGameOn(0)
            firstPlayer = changeFirstPlayer(!firstPlayer)
            setCurrentIndex(lastStateIndex+1)
        }
    }
    let checkWinner = (cellValues) => {
        let playerStatus = []
        playerStatus.push(cellValues.slice(0,3).join(''))
        playerStatus.push(cellValues.slice(3,6).join(''))
        playerStatus.push(cellValues.slice(6,9).join(''))
        playerStatus.push(cellValues[0] + cellValues[3] + cellValues[6])
        playerStatus.push(cellValues[1] + cellValues[4] + cellValues[7])
        playerStatus.push(cellValues[2] + cellValues[5] + cellValues[8])
        playerStatus.push(cellValues[0] + cellValues[4] + cellValues[8])
        playerStatus.push(cellValues[2] + cellValues[4] + cellValues[6])

        if (playerStatus.includes('xxx')) return 2
        else if (playerStatus.includes('ooo')) return 1
        else return false
    }
    let handleStateClick = (stateIndex)=>{
        changeCells(states[stateIndex])
        setCurrentIndex(stateIndex)
        changeGameOn(0)
        changeFirstPlayer(stateIndex % 2 === 0)
        // setStates(states.slice(stateIndex+1))
    }

    return (
        <div className={'Game'}>
            <h2>{gameOn === 0 ? `Player ${firstPlayer ? 'o' : 'x'} turn` : gameOn === -1 ? 'Game End and Draw!' : gameOn === 1 ? 'Player o Wins!' : 'Player x Wins'}</h2>
            <Board cells={cells} clickHandler={handleCellClick} lastStateIndex={currentIndex}/>
            <History states={stateIndexes} stateClickHandler={handleStateClick}/>
        </div>
    )
}