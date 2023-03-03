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

    return (
        <div className="main-coomponent">
            <>
                <Grid item xs={12}>
                    <HeaderOfGame/>
                </Grid>
                <Grid item xs={12}>
                    <GameField
                        bombGrid={bombGrid}
                        setBombGrid={setBombGrid}
                        maskGrid={maskGrid}
                        setMaskGrid={setMaskGrid}
                    />
                </Grid>
            </>
        </div>
    );
}

export default MainComponent;