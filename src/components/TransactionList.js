import React, { useState } from "react";
import "./List.css";

function TransactionList({ transactions, setFilter }) {
  const [filterDate, setFilterDate] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const handleFilter = () => {
    setFilter({ date: filterDate, category: filterCategory });
  };

  return (
    <div className="transaction-list">
      <h2>Transactions</h2>

      <div className="filters">
        <input
          type="month"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="filter-input"
        />
        <input
          type="text"
          placeholder="Category"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="filter-input"
        />
        <button className="filter-button" onClick={handleFilter}>
          Apply Filter
        </button>
      </div>

      {transactions.length === 0 ? (
        <div className="no-transaction">No transactions found.</div>
      ) : (
        <div className="table-wrapper">
          <table className="transaction-table">
            <thead>
              <tr>
                <th>Amount (₹)</th>
                <th>Category</th>
                <th>Description</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, index) => (
                <tr key={index}>
                  <td>₹{t.amount.toFixed(2)}</td>
                  <td>{t.category}</td>
                  <td>{t.description || "-"}</td>
                  <td>{t.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TransactionList;
