import {Grid} from '@mui/material';
import HeaderOfGame from "../HeaderOfGame/HeaderOfGame"
import "./MainComponent.css"
import GameField from "../GameField/GameField"
import {useEffect, useState} from "react";
import {startField} from "./MainComponent.helpers";


function MainComponent(){
    const [bombGrid,setBombGrid] = useState(startField);
    const [imgGrid,setImgGrid] = useState(startField);

    const clearField = () =>{
        let newField = Array(16);
        for(let i=0;i<16;i++){
            newField[i] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        }
        setBombGrid(newField)
        //setImgGrid(startField)
    }

    const generateBombs = () =>{
        let field = bombGrid
        for(let i=0;i<40;i++){
            let bomb = Math.floor(Math.random()*256)
            while(bombGrid[Math.floor(bomb/16)][bomb%16]){
                let bomb = Math.floor(Math.random()*256)
            }
            field[Math.floor(bomb/16)][bomb%16] = 1;
        }
    }

    useEffect(()=>{
        clearField()
    },[])

    return (
        <div className="main-coomponent">
            <>
                <Grid item xs={12}>
                    <HeaderOfGame
                        clearField = {clearField}
                    />
                </Grid>
                <Grid item xs={12}>
                    <GameField
                        bombGrid={bombGrid}
                        setBombGrid={setBombGrid}
                        imgGrid={imgGrid}
                        setImgGrid={setImgGrid}
                    />
                </Grid>
            </>
        </div>
    );
}

export default MainComponent;