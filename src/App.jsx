import React, { useState,useEffect } from "react";
import "./App.css";
import EditTodo from "./Components/EditTodo";

function App() {
  const [totalExpenses, setTotalExpenses] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("totalExpenses");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });
  
  const [expenseAmount, setExpenseAmount] = useState(null);
  const [expenseFor, setExpenseFor] = useState("");
  const [totalExpenseAmount, setTotalExpenseAmount] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("totalExpenseAmount");
    const initialValue = JSON.parse(saved);
    return initialValue || 0;
  });
  
  const [editingId, setEditingId] = useState(null);

  function handelAdd() {
    if (expenseAmount && expenseFor) {
      const newExpense = { id:Date(), amount: expenseAmount, expenseFor };
      setTotalExpenses([...totalExpenses, newExpense]);
      setExpenseAmount(null);
      setExpenseFor("");
      calculateTotalExpense([...totalExpenses, newExpense]);
    } else {
      alert("Please enter both amount and expense for.");
    }
  }

  function calculateTotalExpense(expenses) {
    const newExpenseAmount = expenses.reduce((total, expense) => total + expense.amount, 0);
    setTotalExpenseAmount(newExpenseAmount);
  }

  function handleEditClick(id){
    setEditingId(id);
  }

  function handelDelete(id){
    let todoExpenseArr = [...totalExpenses];
    todoExpenseArr = todoExpenseArr.filter(totalExpense=> totalExpense.id !== id)
    setTotalExpenses(todoExpenseArr);
    calculateTotalExpense([...todoExpenseArr]);
  }

  useEffect(() => {
    localStorage.setItem("totalExpenses", JSON.stringify(totalExpenses));
  }, [totalExpenses]);

  useEffect(() => {
    localStorage.setItem("totalExpenseAmount", JSON.stringify(totalExpenseAmount));
  }, [totalExpenseAmount]);

  return (
    <div className="App">
      <h1>Expense Tracker</h1>
      
      <div className="card">
          <h4><b>Total Expenses</b></h4>
          <p>₹{totalExpenseAmount}</p>
      </div>
      <input
        type="number"
        value={expenseAmount || ""}
        onChange={(e) => setExpenseAmount(Number(e.target.value))}
        placeholder="Expense Amount"
      />
      <input
        type="text"
        value={expenseFor}
        onChange={(e) => setExpenseFor(e.target.value)}
        placeholder="Expense For"
      />
      <button onClick={handelAdd}>Add</button>
      <ul>
        {totalExpenses.sort((a, b) => new Date(b.id) - new Date(a.id)).map((expense) => (
          <li key={expense.id}>
            {editingId === expense.id ? (
                      <EditTodo
                      setEditingId={setEditingId}
                      totalExpenses={totalExpenses}
                      setTotalExpenses={setTotalExpenses}
                      id={expense.id}
                      currentText={expense.expenseFor}
                      currentAmmount={expense.amount}
                      />
            ):(<>
                <span className="display-expenses">
                  <div style={{"backgroundColor":expense.amount<0 ? "#ba0000":"#5d814a",
                    "width": "6px",
                    "height": "36px",
                    "marginRight": "5px"}} className="display-color"/>
                  {expense.expenseFor} - ₹{expense.amount}
                </span>
                <div className="buttons">
                  <button className="edit-btn" onClick={() => handleEditClick(expense.id, expense.expenseFor)} >Edit</button>
                  <button className="delete-btn" onClick={()=>handelDelete(expense.id)}>Delete</button>
                </div>
            </>
          )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
