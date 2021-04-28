import Square from "./Square";

export default function Board(props) {

    return (
            <div className={'Board'}>
                {props.cells.map((cell, i) => (<Square key={i} value={props.cells[i]} clickHandler={props.clickHandler} id={i} lastStateIndex={props.lastStateIndex}/>))}
            </div>
    )
}