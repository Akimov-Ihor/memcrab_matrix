import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createMatrix } from '../../helpers/createMatrix'
import { set_all_valueAC } from '../../store/actionCreators/formsCreators'
import { amountRow } from '../../helpers/amountRow'
import { amountCell } from '../../helpers/amountCell';

const FormCreation = () => {
   const dispatch = useDispatch()

   const [mFromState, nFromState, xFromState] = useSelector(
      ({ valueOfM, valueOfN, valueOfX }) => [valueOfM, valueOfN, valueOfX]
   )

   const [m, setM] = useState('')
   const [n, setN] = useState('')
   const [x, setX] = useState('')

   const matrix = createMatrix(m, n)
   const amountRows = amountRow(matrix)
   const amountCells = amountCell(matrix)

   const sendForm = () => {
      dispatch(set_all_valueAC({ m, n, x, matrix, amountRows, amountCells }))
      setM('')
      setN('')
      setX('')
   }

   return (
      <>
         <div className='formCreation'>
            <div className='formCreationInputs'>
               <input type="number" min='1' placeholder='M' onChange={e => setM(e.target.value)} value={m} />
               <input type="number" min='1' placeholder='N' onChange={e => setN(e.target.value)} value={n} />
               <input type="number" min='1' placeholder='X' onChange={e => setX(e.target.value)} value={x} />
            </div>
            <button disabled={!(m && n && x)} onClick={sendForm}>Click me</button>
         </div>
         <div>
            <span>M:{mFromState}</span>
            <span>N:{nFromState}</span>
            <span>X:{xFromState}</span>
         </div>

      </>

   )
}

export default FormCreation;