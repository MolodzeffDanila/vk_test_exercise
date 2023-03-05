//Функция подсчета бомб
export default function countMines(maskGrid){
    return  maskGrid.reduce((sum, val)=>{
         sum+=val.reduce((sumRow,item)=>{
             sumRow = item === 2 ? sumRow+1 : sumRow
             return sumRow
         },0)
        return sum
    },0)
}