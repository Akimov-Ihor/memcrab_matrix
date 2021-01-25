import * as types from '../actionsTypes/formTypes'

export const set_all_valueAC = value => ({ type: types.SET_ALL_VALUE, payload: value })

export const set_matrix = value => ({ type: types.SET_MATRIX, payload: value })

export const set_rows_amount = value => ({ type: types.SET_ROWS_AMOUNT, payload: value })
export const set_cells_amount = value => ({ type: types.SET_CELLS_AMOUNT, payload: value })

export const refreshMatrixValue = value => ({ type: types.REFRESH_MATRIX_VALUE, payload: value })