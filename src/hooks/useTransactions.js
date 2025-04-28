import { useState, useEffect, useMemo } from "react";

export function useTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState({ date: "", category: "" });

  useEffect(() => {
    const stored = localStorage.getItem("transactions");
    if (stored) {
      setTransactions(JSON.parse(stored));
    } else {

      const defaultTransactions = [
        { amount: 5000, category: "Income", description: "Salary", date: "2025-04-01" },
        { amount: 1000, category: "Food", description: "Groceries", date: "2025-04-05" },
        { amount: 1500, category: "Entertainment", description: "Movie tickets", date: "2025-04-10" },
        { amount: 2000, category: "Rent", description: "April rent", date: "2025-04-01" },
        { amount: 500, category: "Health", description: "Doctor visit", date: "2025-04-07" },
        { amount: 3000, category: "Income", description: "Freelance project", date: "2025-04-15" },
      ];
      setTransactions(defaultTransactions);
      localStorage.setItem("transactions", JSON.stringify(defaultTransactions));
    }
  }, []);


  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem("transactions", JSON.stringify(transactions));
    }
  }, [transactions]);


  const addTransaction = (transaction) => {
    const newTransactions = [...transactions, transaction];
    setTransactions(newTransactions);
  };


  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const matchDate = filter.date ? t.date.startsWith(filter.date) : true;
      const matchCategory = filter.category
        ? t.category.toLowerCase().includes(filter.category.toLowerCase())
        : true;
      return matchDate && matchCategory;
    });
  }, [transactions, filter]);

  return { transactions, addTransaction, filteredTransactions, setFilter };
}
