export interface Transaction {
    id: number;
    date: string;
    amount: number;
    merchant: string;
    category: string;
  }
  
  export interface TransactionsResponse {
    totalTransactions: number;
    transactions: Transaction[];
  } 