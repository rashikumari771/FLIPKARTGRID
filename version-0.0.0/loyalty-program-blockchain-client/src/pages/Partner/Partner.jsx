import React, { useRef, useState } from "react";
import styles from "./Partner.module.css";
import ownerStyles from "./../Owner/Owner.module.css";
import Header from "../../components/Header/Header";
import { useGlobal } from "../../context/GlobalContext";
import flipcoinImage from "./../../assets/flipcoin.png";
import flipcoinLogo from "./../../assets/flipcoin-logo.png";
import TransactionsTable from "../../components/TransactionsTable/TransactionsTable";

const Partner = () => {
  const { isPartner, name, symbol, balance, transactions, transferTokens, account } =
    useGlobal();
  return (
    <div>
      <Header />
      {isPartner ? (
        <div className={ownerStyles.container}>
          <h1 className={ownerStyles.heading}>Partner Portal</h1>
          <section className={ownerStyles.top}>
            <div className={ownerStyles.left}>
              <h3 className={ownerStyles.subheading}>
                Name: <span>{name}</span>
              </h3>
              <h3 className={ownerStyles.subheading}>
                Symbol: <span>{symbol}</span>
              </h3>
              <h3 className={ownerStyles.subheading}>
                Balance: <span>{balance}</span>
              </h3>
            </div>
            <div className={ownerStyles.right}>
              <div className={ownerStyles.logo}>
                <img src={flipcoinLogo} alt="Flipcoin" />
                <img src={flipcoinImage} alt="Flipcoin" />
              </div>
            </div>
          </section>
          <section className={ownerStyles.forms}>
            <TransferTokens transferTokens={transferTokens} />
          </section>
          <TransactionsTable transactions={transactions} account={account} />
        </div>
      ) : (
        <div className={styles.notPartner}>
          <p>You are not allowed to access this.</p>
        </div>
      )}
    </div>
  );
};

const TransferTokens = ({ transferTokens }) => {
  const amountRef = useRef();
  const toAddressRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    const amount = amountRef.current.value;
    const toAddress = toAddressRef.current.value;
    if (amount === "" || toAddress === "")
      return setError("Invalid Credentials");
    setLoading(true);
    transferTokens({
      amount: amount,
      address: toAddress,
    })
      .then(() => {
        setLoading(false);
        amountRef.current.value = "";
        toAddressRef.current.value = "";
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  };

  return (
    <form className={ownerStyles.form} onSubmit={handleSubmit}>
      <h3 className={ownerStyles.heading}>Transfer Tokens</h3>
      <div className={ownerStyles.formgroup}>
        <label className={ownerStyles.label} htmlFor="amount">
          Amount
        </label>
        <input
          className={ownerStyles.input}
          type="text"
          id="amount"
          ref={amountRef}
        />
      </div>
      <div className={ownerStyles.formgroup}>
        <label className={ownerStyles.label} htmlFor="address">
          Address
        </label>
        <input
          className={ownerStyles.input}
          type="text"
          id="address"
          ref={toAddressRef}
        />
      </div>
      {error && <p className={ownerStyles.error}>{error}</p>}
      <button className={ownerStyles.button} disabled={loading} type="submit">
        {loading ? "Transferring..." : "Transfer"}
      </button>
    </form>
  );
};

export default Partner;
