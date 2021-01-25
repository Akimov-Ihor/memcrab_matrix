export const amountCell = (matrix,idx) => {
    const result = matrix.reduce((acc, row) => {
        row.forEach((b, i) => acc[i] = (acc[i] || 0) + b.amount);
        return acc
    }, [])
    return result.map((e) => {
        return {
            amount: e,
            id: result.indexOf(e),
        }
    })
}