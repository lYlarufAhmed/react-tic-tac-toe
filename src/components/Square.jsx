
export default function Square(props){
    let changeValue = ()=>props.clickHandler(props.id)
    return (
        <button className={'Square'} onClick={changeValue}>{props.value}</button>
    )
}