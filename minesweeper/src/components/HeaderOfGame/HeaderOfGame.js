import {Grid} from '@mui/material';
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


import smile from "../../sprites/smile.png"

function HeaderOfGame(){
    return (
    <div className="header">
        <Grid container spacing={5}>
            <Grid item xs={4}>
                <div className="mines">
                    <img src={num_0_mines_left}></img>
                    <img src={num_0_mines_left}></img>
                    <img src={num_0_mines_left}></img>
                </div>
            </Grid>
            <Grid item xs={4} >
                <div className="smile">
                    <img src={smile}></img>
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