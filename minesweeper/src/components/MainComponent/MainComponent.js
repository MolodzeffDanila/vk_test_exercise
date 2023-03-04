import {Grid} from '@mui/material';
import HeaderOfGame from "../HeaderOfGame/HeaderOfGame"
import "./MainComponent.css"
import GameField from "../GameField/GameField"
import {useEffect, useState} from "react";
import {generateBombs, startField} from "./MainComponent.helpers";



function MainComponent(){
    const [minesLeft,setMinesLeft] = useState(40);
    const [bombGrid,setBombGrid] = useState(() => generateBombs(minesLeft));
    const [maskGrid,setMaskGrid] = useState(Array(16).fill(Array(16).fill(1)));
    const [isStarted,setStarted] = useState(false);
    const [isLost, setLost] = useState(false);
    const [isWon,setWon] = useState(false);
    const [timer,setTimer] = useState(0)

    return (
        <div className="main-coomponent">
            <>
                <Grid item xs={12}>
                    <HeaderOfGame
                        isLost={isLost}
                        isWon={isWon}
                        minesLeft={minesLeft}
                    />
                </Grid>
                <Grid item xs={12}>
                    <GameField
                        bombGrid={bombGrid}
                        setBombGrid={setBombGrid}
                        maskGrid={maskGrid}
                        setMaskGrid={setMaskGrid}
                        isStarted={isStarted}
                        setStarted={setStarted}
                        setLost={setLost}
                        setWon={setWon}
                        setMinesLeft={setMinesLeft}
                    />
                </Grid>
            </>
        </div>
    );
}

export default MainComponent;