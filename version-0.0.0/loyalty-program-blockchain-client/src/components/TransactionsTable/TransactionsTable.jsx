import React from "react";
import styles from "./TransactionsTable.module.css";

const TransactionsTable = ({ transactions, account }) => {
  return (
    <>
      <h2 className={styles.heading}>Past Transactions</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t, i) => {
            return (
              <tr key={i}>
                <td>{t.from}</td>
                <td>{t.to}</td>
                <td
                  className={
                    t.from.toLowerCase() === account ? styles.red : styles.green
                  }
                >
                  {t.amount}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default TransactionsTable;
