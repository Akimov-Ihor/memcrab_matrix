import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux"
import './MatirxRowsAmount.css'

import { set_rows_amount, set_matrix, set_cells_amount, refreshMatrixValue } from '../../../store/actionCreators/formsCreators'

import { amountRow } from '../../../helpers/amountRow'
import { amountCell } from '../../../helpers/amountCell'
import { addRow } from "../../../helpers/addRow"


const MatrixRowsAmount = ({ rowsAmountFromState, matrix, nFromState, setPercentFlag }) => {

  const distpach = useDispatch();
  const [classActive, setclassActive] = useState(false)
  const [currenRowAmountId, setcurrenRowAmountId] = useState(null)

  const findCurrentId = (id) => {
    setcurrenRowAmountId(rowAmountRefs[id].id)
    setclassActive(true)

  }

  const rowAmountRefs = []
  const findrowAmountRefs = ref => rowAmountRefs.push(ref)

  const classOfRow = () => {
    if (classActive && currenRowAmountId && rowAmountRefs[currenRowAmountId] !== undefined) {
      rowAmountRefs[currenRowAmountId].classList.add('matixBody_cell_hover_generally_percent')
      setPercentFlag({ show: true, id: currenRowAmountId, horiz: true })

    } else {
      rowAmountRefs.map(e => e.classList.remove('matixBody_cell_hover_generally_percent'))
      setPercentFlag({ show: false, id: null, horiz: true })
    }
  }

  useEffect(() => {
    classOfRow()
  }, [classActive]);




  const handleIncreaseRows = () => {
    const newRow = addRow(nFromState, matrix.length);
    const newMatrix = [];
    matrix.forEach(e => newMatrix.push(e));
    newMatrix.push(newRow);

    distpach(set_matrix(newMatrix));
    distpach(set_rows_amount(amountRow(newMatrix)));
    distpach(set_cells_amount(amountCell(newMatrix)));

  }

  const handleDeleteRow = (id) => {
    const filteredMatrix = matrix.filter(arr => matrix.indexOf(arr) !== id);

    distpach(set_matrix(filteredMatrix));
    distpach(set_rows_amount(amountRow(filteredMatrix)));
    distpach(set_cells_amount(amountCell(filteredMatrix)));
  }

  return (
    <tbody >
      {rowsAmountFromState.length
        ? rowsAmountFromState.map((rowAmount) => {
          return (
            <tr key={rowAmount.id} >
              <td
                key={rowAmount.id}
                id={rowAmount.id}
                ref={findrowAmountRefs}
                className='Matrix_rows_amount'
                >
                <span
                  onMouseLeave={() => setclassActive(false)}
                  onMouseEnter={() => findCurrentId(rowAmount.id)}
                >
                  {classActive && currenRowAmountId == rowAmount.id
                    ? '100 %'
                    : rowAmount.amount
                  }
                </span>
              </td>
              <td className='matrixBody_wrapper_btn'>
                <button className='matrixBody_btn_dlt' onClick={() => handleDeleteRow(rowAmount.id)}></button>
              </td>
            </tr>

          )
        })
        : null
      }

      {
        matrix.length
          ? <tr>
            <td className='matrixBody_wrapper_btn'>
              <button className='matrixBody_btn_add' onClick={handleIncreaseRows}></button>
            </td>
          </tr>
          : null
      }

    </tbody>
  )

}
export default MatrixRowsAmount