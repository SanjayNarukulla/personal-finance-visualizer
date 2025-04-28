import React, { useMemo } from "react";
import Charts from "./Charts";
import "./Dashboard.css"; 

function Dashboard({ transactions }) {
  const { income, expenses, balance } = useMemo(() => {
    let income = 0;
    let expenses = 0;

    transactions.forEach(({ category, amount }) => {
      if (category === "Income") {
        income += amount;
      } else {
        expenses += amount;
      }
    });

    return {
      income,
      expenses,
      balance: income - expenses,
    };
  }, [transactions]);

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Dashboard</h2>

      {transactions.length > 0 ? (
        <>
          <div className="summary">
            <div className="summary-card income-card">
              <h3>Income</h3>
              <p>₹{income.toFixed(2)}</p>
            </div>
            <div className="summary-card expenses-card">
              <h3>Expenses</h3>
              <p>₹{expenses.toFixed(2)}</p>
            </div>
            <div className="summary-card balance-card">
              <h3>Balance</h3>
              <p>₹{balance.toFixed(2)}</p>
            </div>
          </div>

          <div className="charts-section">
            <Charts transactions={transactions} />
          </div>
        </>
      ) : (
        <p className="no-transactions">No transactions to display.</p>
      )}
    </div>
  );
}

export default Dashboard;
