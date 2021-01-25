import { randomNum } from './randomNum'

export const addRow = (n, rowLenght) => {
   return Array(Number(n)).fill().map( (t,id) => {
      return {
         amount: Number(randomNum()),
         id: `${rowLenght}${id}`,
      };
   });
}