import "./GameOfField.css"

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
import useLongPress from "./GameField.hooks"

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
    4: cellTouched,
    99: bombTouched
}
// bombGrid -- поле(бомбы и цифры вокруг них)
// maskGrid -- оторбражаемые клетки(клетки, флаги, вопросики)
// setMaskGrid -- функция смены массива отображаемых клеток
// isLost -- проиграл ли
// setLost -- функция смены флага поражения
// minesLeft -- число оставшихся мин
// setMinesLeft -- функция для изменения числа мин
// isStarted -- флаг начата ли игра
// setStarted -- функция для смены флага начала игры
// isWon -- флаг победа ли
// generateBombs -- функция для генерации нового поля
// setCurrentFace -- функция для смены текущего смайлика вхедере
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
                       generateBombs,
                       setCurrentFace}){


    //обработка нажатия на клетку левой конкой мыши, т.е. ставит флажок/вопросик/ничего
    const showFlag = (event) => {
        event.preventDefault()
        event.stopPropagation()

        let x = Math.floor(+event.target.id /16);
        let y = +event.target.id%16;

        //ничего не делает если победа, поражение или клетка уже показана
        if(maskGrid[x][y]===0 || isLost || isWon){
            return;
        }

        //создание новой маски, которая будет изменена и помещена в состояние
        let newMask = [];
        for(let i=0;i<maskGrid.length;i++){
            newMask.push(Object.assign([], maskGrid[i]))
        }
        //если клетка пустая, то меняем на флажок
        if(maskGrid[x][y]===1 && minesLeft>0){
            newMask[x][y] = 2
        }else if(maskGrid[x][y]===2){ //если в клетке флажок, то меняем на вопросик
            newMask[x][y] = 3
        }else if(maskGrid[x][y]===3){ //если в клетке вопросик возвращаем пустую клетку
            newMask[x][y] = 1
        }
        setMinesLeft(40 - countMines(newMask)) // пересчитываем количество мин для счетчика в хедере
        setMaskGrid(newMask)
    }

    //обработка долгого нажатия
    const backspaceLongPress = useLongPress((event)=>{

        setCurrentFace("surprised")
    }, 150);

    //обработка нажатия на клетку левой конкой мыши
    const showBomb = (event) => {
        //вычисление коородинат, т.к. id у клеток - номер ячейки в одномерном представлении поля
        let x = Math.floor(+event.target.id /16);
        let y = +event.target.id%16;

        //обработка первого нажатия на какую-либо клетку
        if(!isStarted && !isLost){
            setStarted(true);
            bombGrid.current = generateBombs(minesLeft,x,y) //генерация поля таким образом, чтобы не было нажатия на бомбу
            setMaskGrid(Array(16).fill(Array(16).fill(1))) //генерация маски
        }

        if(maskGrid[x][y]!==1 || isLost || isWon){ //если клетка уже показана или победа или поражение, то ничего не делаем
            return;
        }

        let newMask = [];
        if(bombGrid.current[x][y]===-1){ //обработка поражения
            for(let i=0;i<bombGrid.current.length;i++){ // показываем все бомбы, т.е. все клетки с бомбой делаем прозрачными в маске
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
            newMask[x][y] = 99 //клетку, на которую нажали делаем "взорвавшейся бомбой"
            setMaskGrid(newMask)
            setLost(true);
            setStarted(false);
            return;
        }

        for(let i=0;i<maskGrid.length;i++){
            newMask.push(Object.assign([], maskGrid[i]))
        }

        let clearingStack = [];
        //функция, которая добавляет в массив клетки, которые не контактируют с бомбами
        function clear(x,y){
            if (x >= 0 && x < 16 && y >= 0 && y < 16 && newMask[x][y]) {
                clearingStack.push([x,y])
            }
        }
        clear(x,y);
        while (clearingStack.length){ //по всем четырем направлениям ищем клетки, которые не граничат с бомбами
            const [x,y] = clearingStack.pop();
            newMask[x][y] = 0;
            if(bombGrid.current[x][y]===0){
                clear(x-1,y);
                clear(x+1,y);
                clear(x,y-1);
                clear(x,y+1);
            }
        }
        setCurrentFace("smile")
        setMinesLeft(40 - countMines(newMask)) // если вдруг внутри островов были флажки, пересчитываем количество бомб
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
                                         onContextMenu={showFlag}
                                         {...backspaceLongPress}>
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

