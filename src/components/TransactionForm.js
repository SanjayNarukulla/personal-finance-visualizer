import React, { useState } from "react";
import "./Form.css";

function TransactionForm({ addTransaction }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const categories = [
    "Income",
    "Food",
    "Travel",
    "Shopping",
    "Rent",
    "Entertainment",
    "Health",
    "Utilities",
    "Other",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !category || !date) return;
    addTransaction({ amount: parseFloat(amount), category, description, date });
    setAmount("");
    setCategory("");
    setDescription("");
    setDate("");
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Add Transaction</h2>

      <div className="form-group">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="form-group">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="submit-button">
        Add Transaction
      </button>
    </form>
  );
}

export default TransactionForm;
