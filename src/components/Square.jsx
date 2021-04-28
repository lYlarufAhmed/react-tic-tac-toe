
export default function Square(props){
    let changeValue = ()=>props.clickHandler(props.id, props.lastStateIndex)
    return (
        <button className={'Square'} onClick={changeValue}>{props.value}</button>
    )
}