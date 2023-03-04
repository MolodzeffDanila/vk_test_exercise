import {Grid} from '@mui/material';
import ClickNHold from 'react-click-n-hold';
import "./HeaderOfGame.css"
import num_0_mines_left from  "../../sprites/num_0_mines_left.png"
import num_1_mines_left from  "../../sprites/num_1_mines_left.png"
import num_2_mines_left from  "../../sprites/num_2_mines_left.png"
import num_3_mines_left from  "../../sprites/num_3_mines_left.png"
import num_4_mines_left from  "../../sprites/num_4_mines_left.png"
import num_5_mines_left from  "../../sprites/num_5_mines_left.png"
import num_6_mines_left from  "../../sprites/num_6_mines_left.png"
import num_7_mines_left from  "../../sprites/num_7_mines_left.png"
import num_8_mines_left from  "../../sprites/num_8_mines_left.png"
import num_9_mines_left from  "../../sprites/num_9_mines_left.png"

import coolSmile from "../../sprites/smile_win.png"
import smileTouched from "../../sprites/smile_touched.png"
import smile from "../../sprites/smile.png"
import deadSmile from  "../../sprites/smile_dead.png"
import {useEffect, useState} from "react";
import {generateBombs} from "../MainComponent/MainComponent.helpers";

function HeaderOfGame({isLost,isWon,minesLeft,setBombGrid,setMaskGrid,setLost}){

    const restartGame = (event) =>{
        setLost(false)
        event.target.src = smileTouched
        setTimeout(()=>{
            event.target.src = smile
        },100)

        setBombGrid(generateBombs(minesLeft))
        setMaskGrid(Array(16).fill(Array(16).fill(1)))
    }

    return (
    <div className="header">
        <Grid container spacing={5}>
            <Grid item xs={4}>
                <div className="mines">
                    <img src={num_0_mines_left}></img>
                    <img src={num_4_mines_left}></img>
                    <img src={num_0_mines_left}></img>
                </div>
            </Grid>
            <Grid item xs={4} >
                <div className="smile">
                    <img src={isLost ? deadSmile : isWon ?  coolSmile : smile} onClick={restartGame}/>
                </div>
            </Grid>
            <Grid item xs={4} >
                <div className="timer">
                    <img src={num_0_mines_left}></img>
                    <img src={num_0_mines_left}></img>
                    <img src={num_0_mines_left}></img>
                </div>
            </Grid>
        </Grid>
    </div>
    );
}

export default HeaderOfGame;