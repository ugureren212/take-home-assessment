import React, { useEffect, useState, useCallback } from "react";
import { Transaction, TransactionsResponse } from "./types/Transaction";
import "./ExpensesTable.css";

export const ExpensesTable: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = useCallback(async () => {
    try {
      //  only fetching the first page of the api call since the test spec requires me to.
      const response = await fetch(
        "https://tip-transactions.vercel.app/api/transactions?page=1"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }
      const data: TransactionsResponse = await response.json();
      setTransactions(data.transactions);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  // Empty state
  if (!isLoading && transactions.length === 0) {
    return (
      <div className="empty-state">
        <p>No transactions found</p>
      </div>
    );
  }

  const tableHeader = (
    <thead>
      <tr>
        <th className="col-id">ID</th>
        <th className="col-date">Date</th>
        <th className="col-amount">Amount</th>
        <th className="col-merchant">Merchant</th>
        <th className="col-category">Category</th>
      </tr>
    </thead>
  );

  // Loading state with skeleton loader
  if (isLoading) {
    const skeletonRows = 5;
    const skeletonRowArray = Array(skeletonRows).fill(null);

    return (
      <div className="expenses-table-container">
        <p>Loading transactions...</p>
        <table className="expenses-table">
          {tableHeader}
          <tbody>
            {skeletonRowArray.map((_, index) => (
              <tr key={index} className="skeleton-row">
                <td className="col-id">
                  <div className="skeleton-loader"></div>
                </td>
                <td className="col-date">
                  <div className="skeleton-loader"></div>
                </td>
                <td className="col-amount">
                  <div className="skeleton-loader"></div>
                </td>
                <td className="col-merchant">
                  <div className="skeleton-loader"></div>
                </td>
                <td className="col-category">
                  <div className="skeleton-loader"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Error state with retry option
  if (error) {
    return (
      <div className="error-container">
        <p>Unable to load transactions</p>
        <p className="error-message">{error}</p>
        <button
          onClick={() => {
            setError(null);
            setIsLoading(true);
            fetchTransactions();
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="expenses-table-container">
      <table className="expenses-table">
        {tableHeader}
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="col-id">{transaction.id}</td>
              <td className="col-date">
                {new Date(transaction.date).toLocaleDateString()}
              </td>
              <td className="col-amount">${transaction.amount.toFixed(2)}</td>
              <td className="col-merchant">{transaction.merchant}</td>
              <td className="col-category">{transaction.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
