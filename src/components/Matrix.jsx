import React from 'react';
import { useSelector } from "react-redux";
import './Matrix.css';
import FormCreation from './FormCreation/FormCreation'
import MatrixBody from './MatrixBody/MatrixBody';

const Matrix = () => {
  const matrix = useSelector( state => state.matrix )
  return (
    <div className="matrix">
      <FormCreation/>
      {
        matrix.length && <MatrixBody/>
      }
    </div>
  );
}

export default Matrix;