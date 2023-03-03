import "./GameOfField.css"
import {useState, useEffect} from "react"

import cellTouched from "../../sprites/cell_touched.png"
import num_0_cell from  "../../sprites/cell.png"
import num_1_cell from  "../../sprites/cell_1.png"
import num_2_cell from  "../../sprites/cell_2.png"
import num_3_cell from  "../../sprites/cell_3.png"
import num_4_cell from  "../../sprites/cell_4.png"
import num_5_cell from  "../../sprites/cell_5.png"
import num_6_cell from  "../../sprites/cell_6.png"
import num_7_cell from  "../../sprites/cell_7.png"
import num_8_cell from  "../../sprites/cell_8.png"
import bomb from "../../sprites/bomb.png"
import flag from "../../sprites/cell_flag.png"
import question from  "../../sprites/cell_question.png"

const cells = {
    0: cellTouched,
    1: num_1_cell,
    2: num_2_cell,
    3: num_3_cell,
    4: num_4_cell,
    5: num_5_cell,
    6: num_6_cell,
    7: num_7_cell,
    8: num_8_cell,
    "-1":bomb,
}

export const cellMask={
    1: num_0_cell,
    2: flag,
    3: question
}

function GameField({bombGrid,setBombGrid, maskGrid, setMaskGrid}){

    const showBomb = (event) => {
        let x = Math.floor(+event.target.id /16);
        let y = +event.target.id%16;

        if(maskGrid[x][y]===0){
            return
        }

        let newMask = [];
        for(let i=0;i<maskGrid.length;i++){
            newMask.push(Object.assign([], maskGrid[i]))
        }

        let clearingStack = [];

        function clear(x,y){
            console.log(newMask[x][y])
            console.log(newMask)
            if (x >= 0 && x < 16 && y >= 0 && y < 16 && newMask[x][y]) {
                clearingStack.push([x,y])
            }
        }
        clear(x,y);
        while (clearingStack.length){
            console.log(clearingStack)
            const [x,y] = clearingStack.pop();
            newMask[x][y] = 0;
            if(bombGrid[x][y]===0){
                clear(x-1,y);
                clear(x+1,y);
                clear(x,y-1);
                clear(x,y+1);
            }
        }
        setMaskGrid(newMask)
    }

    const redrawField = () =>{
        return (
            <div className="field">
                {bombGrid.map((row, i) => {
                    return(
                        <div key={i} className="row">
                            {row.map((val, j) => {
                                let cell = cells[+val];
                                if(maskGrid[i][j]){
                                    cell = cellMask[maskGrid[i][j]]
                                }
                                return (
                                    <div style={
                                        {
                                            backgroundImage: `url(${cell})`,
                                            width: "16px",
                                            height: "16px",
                                            display: "inline-block"
                                        }
                                    } id={i*16 + j} className="cell" onClick={showBomb}>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        )
    }


    return (
        <>
            {redrawField()}
        </>
    )
}

export default GameField;