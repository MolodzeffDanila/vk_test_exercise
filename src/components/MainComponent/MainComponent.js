import {Grid} from '@mui/material';
import HeaderOfGame from "../HeaderOfGame/HeaderOfGame"
import "./MainComponent.css"
import GameField from "../GameField/GameField"
import {useEffect, useMemo, useRef, useState} from "react";
import {generateBombs} from "./MainComponent.helpers";

function MainComponent(){
    const [minesLeft,setMinesLeft] = useState(40); //количество мин
    //маска которая показывает какие клетки мы позволяем видеть игроку
    const [maskGrid,setMaskGrid] = useState(Array(16).fill(Array(16).fill(1)));
    // Началась ли игра
    const [isStarted,setStarted] = useState(false);
    //Проиграл ли игрок
    const [isLost, setLost] = useState(false);
    //таймер
    const [timer,setTimer] = useState(0);
    //текущая мордочка в хедере игры
    const [currentFace,setCurrentFace] = useState("smile")
    //Ref ссылка на поле с бомбами и цифрами вокруг бомб
    const bombGrid = useRef([]);

    //Хук для старта таймера
    useEffect(()=>{
        if(isStarted){
            setTimeout(() => setTimer(timer + 1), 1000)
        }
    },[isStarted])

    //Хук для обновления количества мин для генерации
    useEffect(()=>{
        setMinesLeft(40)
    },[isLost])

    //После 999 секунд тайме не увеличивается
    useEffect(()=>{
        if(!isLost && !isWon && timer<999 && isStarted){
            setTimeout(()=>setTimer(timer+1),1000)
        }
    },[timer])

    const isWon = useMemo(() => {
        //Простите меня, пожалуйста, таких костылей больше не повторится
        if(!isStarted){
            return false;
        }
        //возвращает true если находится хоть один элемент, который не является бомбой
        // и при этом непрозрачный
        return !bombGrid.current.some(
            (f, i) => {
                return f.some((item, j) => {
                    return item !== -1 && maskGrid[i][j] !== 0
                })
        })
        },[bombGrid, maskGrid],
    );

    return (
        <div className="main-coomponent">
            <>
                <Grid item xs={12}>
                    <HeaderOfGame
                        isLost={isLost}
                        setLost={setLost}
                        isWon={isWon}
                        bombGrid={bombGrid}
                        minesLeft={minesLeft}
                        generateBombs={generateBombs}
                        timer={timer}
                        setTimer={setTimer}
                        setMaskGrid={setMaskGrid}
                        setStarted={setStarted}
                        currentFace={currentFace}
                        setCurrentFace={setCurrentFace}
                    />
                </Grid>
                <Grid item xs={12}>
                    <GameField
                        bombGrid={bombGrid}
                        maskGrid={maskGrid}
                        setMaskGrid={setMaskGrid}
                        isStarted={isStarted}
                        setStarted={setStarted}
                        isWon={isWon}
                        isLost={isLost}
                        setLost={setLost}
                        minesLeft={minesLeft}
                        setMinesLeft={setMinesLeft}
                        generateBombs={generateBombs}
                        setCurrentFace={setCurrentFace}
                    />
                </Grid>
            </>
        </div>
    );
}

export default MainComponent;