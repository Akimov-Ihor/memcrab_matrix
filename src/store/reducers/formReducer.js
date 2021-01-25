import * as types from '../actionsTypes/formTypes'
import { initialState } from '../initialState'

export const formReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.SET_M_VALUE:
            {
                return {
                    ...state,
                    valueOfM: action.payload
                }
            }
        case types.SET_N_VALUE:
            {
                return {
                    ...state,
                    valueOfN: action.payload
                }
            }
        case types.SET_X_VALUE:
            {
                return {
                    ...state,
                    valueOfX: action.payload
                }
            }
        case types.REFRESH_MATRIX_VALUE:
            {
                return {
                    ...state,
                    matrix: [...action.payload.matrix],
                    matrixRowsAmount: [...action.payload.amountRows],
                    matrixCellsAmount: [...action.payload.amountCells]
                }
            }
        case types.SET_ALL_VALUE:
            {
                return {
                    ...state,
                    valueOfX: action.payload.x,
                    valueOfM: action.payload.m,
                    valueOfN: action.payload.n,
                    matrix: [...action.payload.matrix],
                    matrixRowsAmount: [...action.payload.amountRows],
                    matrixCellsAmount: [...action.payload.amountCells]
                }
            }
        case types.SET_MATRIX:
            {
                return {
                    ...state,
                    matrix: [...action.payload]
                }
            }
        case types.SET_ROWS_AMOUNT:
            {
                return {
                    ...state,
                    matrixRowsAmount: [...action.payload]
                }
            }
        case types.SET_CELLS_AMOUNT:
            {
                return {
                    ...state,
                    matrixCellsAmount: [...action.payload]
                }
            }

        default:
            return state;
    }


}