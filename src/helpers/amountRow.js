export const amountRow = (matrix) => {

    return matrix.map((arr) => {
        if (arr.length) {
            const amount = arr.reduce((total, current) => total + current.amount, 0)
            return {
                amount,
                id: matrix.indexOf(arr),
            }
        } else {
            return arr
        }
    })
}