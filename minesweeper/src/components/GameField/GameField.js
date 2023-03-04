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
import bombTouched from "../../sprites/bomb_exploaded.png"

import flag from "../../sprites/cell_flag.png"
import question from  "../../sprites/cell_question.png"

import countMines from "./GameField.helpers"
import {generateBombs} from "../MainComponent/MainComponent.helpers";

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
    3: question,
    99: bombTouched
}

function GameField({bombGrid,
                       maskGrid,
                       setMaskGrid,
                       isLost,
                       setLost,
                       minesLeft,
                       setMinesLeft,
                       isStarted,
                       setStarted,
                       isWon,
                       generateBombs}){

    const showFlag = (event) => {
        event.preventDefault()
        event.stopPropagation()

        let x = Math.floor(+event.target.id /16);
        let y = +event.target.id%16;

        if(maskGrid[x][y]===0 || isLost || isWon){
            return;
        }

        let newMask = [];
        for(let i=0;i<maskGrid.length;i++){
            newMask.push(Object.assign([], maskGrid[i]))
        }
        if(maskGrid[x][y]===1 && minesLeft>0){
            newMask[x][y] = 2
        }else if(maskGrid[x][y]===2){
            newMask[x][y] = 3
        }else if(maskGrid[x][y]===3){
            newMask[x][y] = 1
        }
        setMinesLeft(40 - countMines(newMask))
        setMaskGrid(newMask)

    }


    const showBomb = (event) => {
        let x = Math.floor(+event.target.id /16);
        let y = +event.target.id%16;

        if(!isStarted && !isLost){
            setStarted(true);
            bombGrid.current = generateBombs(minesLeft,x,y)
            setMaskGrid(Array(16).fill(Array(16).fill(1)))
        }

        if(maskGrid[x][y]!==1 || isLost || isWon){
            return;
        }

        let newMask = [];
        if(bombGrid.current[x][y]===-1){
            for(let i=0;i<bombGrid.current.length;i++){
                let tmp = []
                for(let j=0;j<bombGrid.current.length;j++){
                    if(bombGrid.current[i][j]===-1 || maskGrid[i][j]===0){
                        tmp.push(0)
                    }else{
                        tmp.push(maskGrid[i][j])
                    }
                }
                newMask.push(tmp)
            }
            newMask[x][y] = 99
            setMaskGrid(newMask)
            setLost(true);
            setStarted(false);
            return;
        }

        for(let i=0;i<maskGrid.length;i++){
            newMask.push(Object.assign([], maskGrid[i]))
        }

        let clearingStack = [];

        function clear(x,y){
            if (x >= 0 && x < 16 && y >= 0 && y < 16 && newMask[x][y]) {
                clearingStack.push([x,y])
            }
        }
        clear(x,y);
        while (clearingStack.length){
            const [x,y] = clearingStack.pop();
            newMask[x][y] = 0;
            if(bombGrid.current[x][y]===0){
                clear(x-1,y);
                clear(x+1,y);
                clear(x,y-1);
                clear(x,y+1);
            }
        }
        setMinesLeft(40 - countMines(newMask))
        setMaskGrid(newMask)
    }

    const redrawField = () =>{
        return (
            <div className="field">
                {maskGrid.map((row, i) => {
                    return(
                        <div key={i} className="row">
                            {row.map((val, j) => {
                                let cell;
                                if(maskGrid[i][j]){
                                    cell = cellMask[maskGrid[i][j]]
                                }else{
                                    cell = cells[bombGrid.current[i][j]]
                                }

                                return (
                                    <div style={
                                        {
                                            backgroundImage: `url(${cell})`,
                                            width: "16px",
                                            height: "16px",
                                            display: "inline-block"
                                        }
                                    } id={i*16 + j} className="cell"
                                         onClick={showBomb}
                                         onContextMenu={showFlag}>
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

