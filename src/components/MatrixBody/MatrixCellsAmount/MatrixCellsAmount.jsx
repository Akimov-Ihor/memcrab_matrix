import React, { useEffect, useState } from 'react'
import './MatrixCellsAmount.css'


const MatrixCellsAmount = ({ cellsAmountFromState,setPercentFlag }) => {
    const [classActive, setclassActive] = useState(false)
    const [currenCellAmountId, setCurrenCellAmountId] = useState(null)

    const findCurrentId = (id) => {
        setCurrenCellAmountId(cellAmountRefs[id].id)
        setclassActive(true)
       
    }

    const cellAmountRefs = []
    const findCellAmountRefs = ref => cellAmountRefs.push(ref)

    const classOfCell = () => {
        if (classActive && currenCellAmountId && cellAmountRefs[currenCellAmountId] !== undefined) {
            cellAmountRefs[currenCellAmountId].classList.add('matixBody_cell_hover_generally_percent')
            setPercentFlag({show:true,id:currenCellAmountId,horiz:false})

        } else {
            cellAmountRefs.map(e => e.classList.remove('matixBody_cell_hover_generally_percent'))
            setPercentFlag({show:false,id:null,horiz:false})
        }
    }

    useEffect(() => {

        classOfCell()
    }, [classActive]);

    return (
        <tr>
            {
                cellsAmountFromState.length
                    ? cellsAmountFromState.map((cellAmount) => {
                        return (
                            <td
                                key={cellAmount.id}
                                id={cellAmount.id}
                                ref={findCellAmountRefs}
                                className='Matrix_cells_amount'
                            >
                                <span
                                    onMouseLeave={() => setclassActive(false)}
                                    onMouseEnter={() => findCurrentId(cellAmount.id)}
                                >
                                    {classActive && currenCellAmountId == cellAmount.id
                                        ? '100 %'
                                        : cellAmount.amount
                                    }
                                </span>

                            </td>
                        )
                    })
                    : null
            }
        </tr>
    )
}
export default MatrixCellsAmount