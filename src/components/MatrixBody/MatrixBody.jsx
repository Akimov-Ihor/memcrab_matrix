import React, { useEffect, useState } from "react"
import './MatrixBody.css'
import { amountRow } from '../../helpers/amountRow'
import { useDispatch, useSelector } from "react-redux"
import { refreshMatrixValue } from '../../store/actionCreators/formsCreators'
import { amountCell } from '../../helpers/amountCell'

import MatrixCellsAmount from "./MatrixCellsAmount/MatrixCellsAmount"
import MatrixRowsAmount from "./MatrixRowsAmount/MatirxRowsAmount"
import { percentOfAmountCells } from "../../helpers/percentOfAmountCells"
import { percentOfAmountRows } from '../../helpers/percentOfAmountRows'

const MatrixBody = () => {
  const [matrixFromState, rowsAmountFromState, cellsAmountFromState, nFromState, xFromState, mFromState] = useSelector(
    ({ matrix, matrixRowsAmount, matrixCellsAmount, valueOfN, valueOfX, valueOfM }) => [matrix, matrixRowsAmount, matrixCellsAmount, valueOfN, valueOfX, valueOfM]
  )
  const arrOfRefs = [];
  const matrix = matrixFromState;
  const distpach = useDispatch();
  const [percentFlag, setPercentFlag] = useState({ show: false, id: null, horiz: false });



  const showNearstNumber = (event) => {
    event.persist()
    const idFromCell = event.target.parentNode.id;
    if (idFromCell) {

      const oneLevelArr = matrix.flat().sort((a, b) => a.amount > b.amount ? 1 : -1);
      const selectedCellObject = oneLevelArr.filter(i => i.id === idFromCell)[0];

      const sortBySelectedCenter = oneLevelArr.sort((a, _) => a.amount < selectedCellObject.amount ? 1 : -1);
      const indexOfSelectedCenter = sortBySelectedCenter.indexOf(selectedCellObject);

      const [lessThenSelected, moreThenSelected, index] = [
        sortBySelectedCenter.slice(0, indexOfSelectedCenter).reverse(),
        sortBySelectedCenter.slice(indexOfSelectedCenter + 1).reverse(),
        sortBySelectedCenter.indexOf(selectedCellObject)
      ];

      const addClassHover = (firstPart, lastPart = []) => {
        const сombineArr = firstPart.concat(lastPart).filter(e => e.amount !== selectedCellObject.amount)

        const findRefs = сombineArr.map(({ id }) => {
          const refIds = arrOfRefs.map(r => r.id);
          const indexRef = refIds.indexOf(id)
          const lastNumberOfId = arrOfRefs[indexRef].id.split('')
          arrOfRefs[indexRef].classList.add('matrixBody_cell_hover')

        });
      }

      if (index === 0) { // last element in arr
        const firstPart = sortBySelectedCenter.slice(-xFromState)
        addClassHover(firstPart, [])
      }
      else if (index === sortBySelectedCenter.length - 1) {  // first element in arr
        const firstPart = sortBySelectedCenter.slice(-xFromState - 1)
        addClassHover(firstPart, [])
      }
      else {
        if (Number(xFromState) % 2 === 0) {   // first element in arr
          const [firstPart, lastPart] = [
            moreThenSelected.length < xFromState / 2 ? lessThenSelected.slice(0, (xFromState / 2) + 1) : lessThenSelected.slice(0, xFromState / 2),
            lessThenSelected.length < xFromState / 2 ? moreThenSelected.slice(0, (xFromState / 2) + 1) : moreThenSelected.slice(0, xFromState / 2)
          ]
          addClassHover(firstPart, lastPart)
        }
        else {
          let [firstPart, lastPart] = [
            lessThenSelected.slice(0, Math.floor(xFromState / 2)),
            moreThenSelected.slice(0, Math.round(xFromState / 2))
          ];
          if (firstPart.length + lastPart.length < xFromState) {
            firstPart = lessThenSelected.slice(0, Math.floor(xFromState / 2) + 1)
          }
          addClassHover(firstPart, lastPart)
        }
      }
    }
  }


  const hideNearstNumber = () => arrOfRefs.map(r => r.classList.remove('matrixBody_cell_hover'))


  const handleIncreamentValue = (id) => {
    matrix.forEach((arr) => arr.forEach(obj => obj.id === id ? obj.amount += 1 : obj.amount))
    const [amountRows, amountCells] = [amountRow(matrix), amountCell(matrix)]
    distpach(refreshMatrixValue({ matrix, amountRows, amountCells }));
  }
  const setCellRef = (ref, x, y) => {
    ref && arrOfRefs.push(ref)
  }
  return (
    <table className="matrixBody_wrapper">
      <tbody>
        {matrix.length
          ? matrix.map((row, id) => {
            return (
              <tr key={id} >
                {
                  row.map((cell, i) => {
                    return (
                      <td
                        key={cell.id}
                        id={cell.id}
                        ref={setCellRef}
                        onClick={() => { handleIncreamentValue(cell.id) }}

                        className={
                          percentFlag.show
                            ? percentFlag.horiz
                              ? percentFlag.id == id // row
                                ? 'matixBody_cell_hover_percent'
                                : ''
                              : row[percentFlag.id].id == cell.id // cell
                                ? 'matixBody_cell_hover_percent'
                                : ''
                            : ''}
                      >
                        {
                          <span
                            onMouseEnter={showNearstNumber}
                            onMouseLeave={hideNearstNumber}
                            >
                            {percentFlag.show
                              ? percentFlag.horiz
                                ? percentFlag.id == id // row
                                  ? `${percentOfAmountRows(cell, rowsAmountFromState, id)} %`
                                  : cell.amount
                                : row[percentFlag.id].id == cell.id // cell
                                  ? `${percentOfAmountCells(cell, cellsAmountFromState[row.indexOf(cell)])} %`
                                  : cell.amount
                              : cell.amount}
                          </span>
                        }
                      </td>
                    )
                  })
                }
              </tr>
            )
          })
          : null
        }
        <MatrixCellsAmount cellsAmountFromState={cellsAmountFromState} setPercentFlag={setPercentFlag} />
      </tbody>
      <MatrixRowsAmount rowsAmountFromState={rowsAmountFromState} matrix={matrix} nFromState={nFromState} setPercentFlag={setPercentFlag} />
    </table>
  )
}


export default MatrixBody;