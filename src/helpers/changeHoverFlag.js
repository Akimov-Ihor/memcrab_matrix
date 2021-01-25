export const changeHoverFlag = (arg, chosenCell, matrix) => {
    return matrix.map(arr => arr.map(obj => (arg.includes(obj) && obj !== chosenCell) ? { amount: obj.amount, id: obj.id } : obj))
       



}