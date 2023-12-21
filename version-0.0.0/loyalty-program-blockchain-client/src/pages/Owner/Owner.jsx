import React, { useRef, useState } from "react";
import styles from "./Owner.module.css";
import Header from "../../components/Header/Header";
import { useGlobal } from "../../context/GlobalContext";
import TransactionsTable from "../../components/TransactionsTable/TransactionsTable";
import flipcoinLogo from "../../assets/flipcoin-logo.png";
import flipcoinImage from "../../assets/flipcoin.png";

const Owner = () => {
  const {
    account,
    name,
    symbol,
    isOwner,
    totalSupply,
    transactions,
    addPartner,
    mintTokens,
    transferTokensFrom,
  } = useGlobal();
  return (
    <div>
      <Header />
      {isOwner ? (
        <div className={styles.container}>
          <h1 className={styles.heading}>Owner Portal</h1>
          <section className={styles.top}>
            <div className={styles.left}>
              <h3 className={styles.subheading}>
                Name: <span>{name}</span>
              </h3>
              <h3 className={styles.subheading}>
                Symbol: <span>{symbol}</span>
              </h3>
              <h3 className={styles.subheading}>
                Total Supply: <span>{totalSupply}</span>
              </h3>
            </div>
            <div className={styles.right}>
              <div className={styles.logo}>
                <img
                  className={styles.logo_image}
                  src={flipcoinLogo}
                  alt="Flipcoin"
                />
                <img
                  className={styles.logo_text}
                  src={flipcoinImage}
                  alt="Flipcoin"
                />
              </div>
            </div>
          </section>
          <section className={styles.info}></section>
          <section className={styles.forms}>
            <AddPartner addPartner={addPartner} />
            <MintTokens mintTokens={mintTokens} />
            <TransferTokensFrom transferTokensFrom={transferTokensFrom} />
          </section>
          <TransactionsTable transactions={transactions} account={account} />
        </div>
      ) : (
        <div className={styles.notOwner}>
          <p>You are not allowed to access this.</p>
        </div>
      )}
    </div>
  );
};

const AddPartner = ({ addPartner }) => {
  const partnerNameRef = useRef();
  const partnerAddressRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    const partnerName = partnerNameRef.current.value;
    const partnerAddress = partnerAddressRef.current.value;
    if (partnerName === "" || partnerAddress === "")
      return setError("Invalid Credentials");
    setLoading(true);
    addPartner({
      name: partnerName,
      address: partnerAddress,
    })
      .then(() => {
        setLoading(false);
        partnerNameRef.current.value = "";
        partnerAddressRef.current.value = "";
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3 className={styles.heading}>Add Partner</h3>
      <div className={styles.formgroup}>
        <label className={styles.label} htmlFor="partnerName">
          Partner Name
        </label>
        <input
          className={styles.input}
          type="text"
          id="partnerName"
          ref={partnerNameRef}
        />
      </div>
      <div className={styles.formgroup}>
        <label className={styles.label} htmlFor="partnerAddress">
          Partner Address
        </label>
        <input
          className={styles.input}
          type="text"
          id="partnerAddress"
          ref={partnerAddressRef}
        />
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <button className={styles.button} disabled={loading} type="submit">
        {loading ? "Adding..." : "Add"}
      </button>
    </form>
  );
};

const MintTokens = ({ mintTokens }) => {
  const amountRef = useRef();
  const addressRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    const amount = amountRef.current.value;
    const address = addressRef.current.value;
    if (amount === "" || address === "") return setError("Invalid Credentials");
    setLoading(true);
    mintTokens({
      amount: amount,
      address: address,
    })
      .then(() => {
        setLoading(false);
        amountRef.current.value = "";
        addressRef.current.value = "";
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3 className={styles.heading}>Mint Tokens</h3>
      <div className={styles.formgroup}>
        <label className={styles.label} htmlFor="amount">
          Amount
        </label>
        <input
          className={styles.input}
          type="text"
          id="amount"
          ref={amountRef}
        />
      </div>
      <div className={styles.formgroup}>
        <label className={styles.label} htmlFor="address">
          Partner Address
        </label>
        <input
          className={styles.input}
          type="text"
          id="address"
          ref={addressRef}
        />
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <button className={styles.button} disabled={loading} type="submit">
        {loading ? "Minting..." : "Mint"}
      </button>
    </form>
  );
};

const TransferTokensFrom = ({ transferTokensFrom }) => {
  const amountRef = useRef();
  const fromAddressRef = useRef();
  const toAddressRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    const amount = amountRef.current.value;
    const fromAddress = fromAddressRef.current.value;
    const toAddress = toAddressRef.current.value;
    if (amount === "" || fromAddress === "" || toAddress === "")
      return setError("Invalid Credentials");
    setLoading(true);
    transferTokensFrom({
      amount: amount,
      from: fromAddress,
      to: toAddress,
    })
      .then(() => {
        setLoading(false);
        amountRef.current.value = "";
        fromAddressRef.current.value = "";
        toAddressRef.current.value = "";
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3 className={styles.heading}>Transfer Tokens</h3>
      <div className={styles.formgroup}>
        <label className={styles.label} htmlFor="amount">
          Amount
        </label>
        <input
          className={styles.input}
          type="text"
          id="amount"
          ref={amountRef}
        />
      </div>
      <div className={styles.formgroup}>
        <label className={styles.label} htmlFor="address1">
          From Address
        </label>
        <input
          className={styles.input}
          type="text"
          id="address1"
          ref={fromAddressRef}
        />
      </div>
      <div className={styles.formgroup}>
        <label className={styles.label} htmlFor="address2">
          To Address
        </label>
        <input
          className={styles.input}
          type="text"
          id="address2"
          ref={toAddressRef}
        />
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <button className={styles.button} disabled={loading} type="submit">
        {loading ? "Transferring..." : "Transfer"}
      </button>
    </form>
  );
};

export default Owner;
