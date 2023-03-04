import {Grid} from '@mui/material';
import HeaderOfGame from "../HeaderOfGame/HeaderOfGame"
import "./MainComponent.css"
import GameField from "../GameField/GameField"
import {useEffect, useMemo, useState} from "react";
import {generateBombs} from "./MainComponent.helpers";



function MainComponent(){
    const [minesLeft,setMinesLeft] = useState(40);
    const [bombGrid,setBombGrid] = useState(() => generateBombs(minesLeft));
    const [maskGrid,setMaskGrid] = useState(Array(16).fill(Array(16).fill(1)));
    const [isStarted,setStarted] = useState(false);
    const [isLost, setLost] = useState(false);
    const [timer,setTimer] = useState(0);

    const isWon = useMemo(() => !bombGrid.some(
            (f, i) => {
                return f.some((item, j)=>{
                    return item === -1 && maskGrid[i][j] !== 2 && maskGrid[i][j]!==0
                })
            }

        ),
        [bombGrid, maskGrid],
    );

    return (
        <div className="main-coomponent">
            <>
                <Grid item xs={12}>
                    <HeaderOfGame
                        isLost={isLost}
                        setLost={setLost}
                        isWon={isWon}
                        minesLeft={minesLeft}
                        generateBombs={generateBombs}
                        setBombGrid={setBombGrid}
                        setMaskGrid={setMaskGrid}
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
                        isLost={isLost}
                        setLost={setLost}
                        setMinesLeft={setMinesLeft}
                    />
                </Grid>
            </>
        </div>
    );
}

export default MainComponent;