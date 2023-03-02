import {Grid, Paper, Box} from '@mui/material';
import HeaderOfGame from "../HeaderOfGame/HeaderOfGame"
import "./MainComponent.css"
import GameField from "../GameField/GameField"

function MainComponent(){
    return (
        <div className="main-coomponent">
            <>
                <Grid item xs={12}>
                    <HeaderOfGame/>
                </Grid>
                <Grid item xs={12}>
                    <GameField/>
                </Grid>
            </>
        </div>
    );
}

export default MainComponent;