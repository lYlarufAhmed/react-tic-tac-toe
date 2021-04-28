import HistoryState from "./HistoryState";

export default function History(props){
    return (
        <div className={'History'}>
            {
                props.states.map((s)=>(<HistoryState key={s} clickHandler={props.stateClickHandler} stateIndex={s}/>))
            }
        </div>
    )
}