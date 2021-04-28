export default function HistoryState(props){
    return(
        <button className={'State'} onClick={e=>props.clickHandler(props.stateIndex)}>{props.stateIndex > 0 ? `Move: ${props.stateIndex}`:`Initial`}</button>
    )
}