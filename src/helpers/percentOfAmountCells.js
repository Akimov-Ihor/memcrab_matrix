export const percentOfAmountCells=(elem,amount)=>{
   if (amount.amount){
    return Math.round((elem.amount*100)  / amount.amount)
   }     
 }
    