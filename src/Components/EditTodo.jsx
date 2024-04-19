import React from 'react'
import { useState } from 'react';

const EditTodo = ({setEditingId, setTotalExpenses, totalExpenses, id, currentText, currentAmmount}) => {
  
  const [editedText, setEditedText] = useState(currentText);
  const [editedAmount, setEditedAmount] = useState(currentAmmount);
  
  
  function handelSave(){
    const newTotalExpenses = totalExpenses.map(totalExpense=>{
      if(totalExpense.id === id){
        return {...totalExpense, amount: editedAmount, expenseFor:editedText}
      }
      return totalExpense;
    })
    setTotalExpenses(newTotalExpenses);
    setEditingId(null);
  }
  function handelCancel(){
      setEditingId(null);
      return;
    }
  
  return (
    <div className="updated-form">
    <div>
      <input
          type="number"
          value={editedAmount || ""}
          onChange={(e) => setEditedAmount(Number(e.target.value))}
          placeholder="Expense Amount"
        />
        <input
          type="text"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          placeholder="Expense For"
        />
      </div>
      <div>
        <button onClick={handelSave}>Save</button>
        <button onClick={handelCancel}>Cancel</button>
      </div>
  </div>
  )
}

export default EditTodo;
