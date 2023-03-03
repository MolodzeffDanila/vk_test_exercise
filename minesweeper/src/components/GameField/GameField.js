import cell from "../../sprites/cell.png"
import bomb from "../../sprites/bomb.png"
import "./GameOfField.css"
import {useState, useEffect} from "react"

function GameField({bombGrid,setBombGrid,imgGrid,setImgGrid}){
    const [minesLeft,setMinesLeft] = useState(40);
    const [fieldElem,setField] = useState('')

    const showBomb = (event) => {
        let x = Math.floor(+event.target.id / 16)
        let y = +event.target.id % 16
        let tmpField = bombGrid;
        tmpField[x][y] = 1
        setBombGrid(tmpField)
        event.target.style.backgroundImage = `url(${bomb})`;
    }


    useEffect(()=>{
        console.log("field")
        //console.log(fieldElem.props?.children[0]?.props.children)
    },[fieldElem])

    useEffect(()=>{
        console.log("bomb")
        //console.log(fieldElem.props?.children[0]?.props.children)
        foo()
    },[bombGrid])

    const foo = () => {
        setField(redrawField())
    }

    const redrawField = () =>{
        return (
            <div className="field">
                {bombGrid.map((row, i) => (
                    <div key={i} className="row">
                        {row.map((val, j) => {
                            return (
                                <div style={
                                    {
                                        backgroundImage: `url(${cell})`,
                                        width:"16px",
                                        height:"16px",
                                        display:"inline-block"
                                    }
                                } className="cell" onClick={showBomb} >

                                </div>
                            )
                        })}
                    </div>
                ))}
            </div>
        )
    }


    return (
        <>
            {fieldElem}
        </>
    )
}

export default GameField;