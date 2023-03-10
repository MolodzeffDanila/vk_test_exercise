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
import suprisedFace from "../../sprites/smile_surprised.png"
import coolSmile from "../../sprites/smile_win.png"
import smileTouched from "../../sprites/smile_touched.png"
import smile from "../../sprites/smile.png"
import deadSmile from  "../../sprites/smile_dead.png"
import {useEffect, useState} from "react";
import {generateBombs} from "../MainComponent/MainComponent.helpers";

//Объект, хранящий цифры и соответствующие им изображения
const minesCount = {
    0: num_0_mines_left,
    1: num_1_mines_left,
    2: num_2_mines_left,
    3: num_3_mines_left,
    4: num_4_mines_left,
    5: num_5_mines_left,
    6: num_6_mines_left,
    7: num_7_mines_left,
    8: num_8_mines_left,
    9: num_9_mines_left
}

//Объект, хранящий смайлики и соответствующие им изображения
const faces = {
    "dead": deadSmile,
    "smile": smile,
    "touched":smileTouched,
    "surprised": suprisedFace,
    "cool": coolSmile
}

//isLost -- проиграл ли
// isWon -- флаг победа ли
// minesLeft -- число оставшихся мин
// bombGrid -- поле(бомбы и цифры вокруг них)
// setMaskGrid -- функция смены массива отображаемых клеток
// setLost -- функция смены флага поражения
// timer -- показатель таймера
// setTimer -- функция изменения состояния таймера
// setStarted  -- функция для смены флага начала игры
// currentFace -- значение текущего выбранного смайлика
// setCurrentFace -- функция изменения состояния смайлика

function HeaderOfGame({isLost,
                          isWon,
                          minesLeft,
                          bombGrid,
                          setMaskGrid,
                          setLost,
                          timer,
                          setTimer,
                          setStarted,
                          currentFace,
                          setCurrentFace
}){

    //обработка смены смайлика при победе или поражении
    useEffect(()=>{
        if(isLost){
            setCurrentFace("dead")
        }else if(isWon){
            setCurrentFace("cool")
        }
    },[isLost,isWon])

    //рестарт игры при нажатии на смайлик
    const restartGame = (event) =>{
        setLost(false)
        //смайлик на 0.1 секунды становится нажатым, потом становится в стандартное положение
        event.target.src = smileTouched
        setTimeout(()=>{
            event.target.src = smile
        },100)
        //обновление таймера
        setTimer(0)
        setStarted(false)
        //генерация поля и сброс маски
        bombGrid.current = generateBombs(40)
        setMaskGrid(Array(16).fill(Array(16).fill(1)))
    }

    return (
    <div className="header">
        <Grid container spacing={5}>
            <Grid item xs={4}>
                <div className="mines">
                    <img src={minesCount[Math.floor(minesLeft/100)]}></img>
                    <img src={minesCount[Math.floor(minesLeft%100 / 10)]}></img>
                    <img src={minesCount[Math.floor(minesLeft%10)]}></img>
                </div>
            </Grid>
            <Grid item xs={4} >
                <div className="smile">
                    <img src={faces[currentFace]} onClick={restartGame}/>
                </div>
            </Grid>
            <Grid item xs={4} >
                <div className="timer">
                    <img src={minesCount[Math.floor(timer/100)]}></img>
                    <img src={minesCount[Math.floor(timer%100 / 10)]}></img>
                    <img src={minesCount[Math.floor(timer%10)]}></img>
                </div>
            </Grid>
        </Grid>
    </div>
    );
}

export default HeaderOfGame;