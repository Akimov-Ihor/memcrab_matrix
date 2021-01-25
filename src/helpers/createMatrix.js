import { randomNum } from './randomNum'

export const createMatrix = (rows, cell) => {
    const matrix = Array(Number(rows)).fill().map((e, id) => Array(Number(cell)).fill().map((t, idx) => t = {
        amount: Number(randomNum()),
        id: `${id}${idx}`,
        ref: null
    }))
    return matrix.sort((a, b) => b.amount - a.amount);


}