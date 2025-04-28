import React, { useState } from "react";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Dashboard from "./components/Dashboard";
import { useTransactions } from "./hooks/useTransactions";
import "./App.css"; 

function App() {
  const { transactions, addTransaction, filteredTransactions, setFilter } =
    useTransactions();
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container">
      <h1 className="app-title">Personal Finance Tracker</h1>

      <div className="tabs">
        <div
          className={`tab ${activeTab === "dashboard" ? "active" : ""}`}
          onClick={() => handleTabChange("dashboard")}
        >
          Dashboard
        </div>
        <div
          className={`tab ${activeTab === "transactionForm" ? "active" : ""}`}
          onClick={() => handleTabChange("transactionForm")}
        >
          Add Transaction
        </div>
        <div
          className={`tab ${activeTab === "transactionList" ? "active" : ""}`}
          onClick={() => handleTabChange("transactionList")}
        >
          Transaction List
        </div>
      </div>

      
      <div className="main-content">
        {activeTab === "dashboard" && <Dashboard transactions={transactions} />}
        {activeTab === "transactionForm" && (
          <TransactionForm addTransaction={addTransaction} />
        )}
        {activeTab === "transactionList" && (
          <TransactionList
            transactions={filteredTransactions}
            setFilter={setFilter}
          />
        )}
      </div>
    </div>
  );
}

export default App;
