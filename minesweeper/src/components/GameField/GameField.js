import cell from "../../sprites/cell.png"
import bomb from "../../sprites/bomb.png"
import "./GameOfField.css"
import {useState, useEffect} from "react"

function GameField(){
    const [minesLeft,setMinesLeft] = useState(40);
    const [bombGrid,setBombGrid] = useState(Array(16));

    
    const showBomb = (event) => {
        event.target.src = bomb;
    }

    useEffect(()=>{
        let newField = Array(16);
        for(let i=0;i<16;i++){
            newField[i] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        }
        setBombGrid(newField)
    },[])
    
    return (
        <>
            <div className="field">
                {bombGrid.map((row, i) => (
                    <div key={i} className="row">
                        {row.map((val, j) => (
                            <div className="cell" >
                                <img src={cell} onClick={showBomb}/>
                            </div>
                        ))}
                    </div>
                ))}
            </div></>
    )
}

export default GameField;