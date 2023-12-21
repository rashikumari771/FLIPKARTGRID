import React, { useEffect } from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { useMoralis } from "react-moralis";
import flipcoinImage from "../../assets/flipcoin.png";
import flipcoinLogoImage from "../../assets/flipcoin-logo.png";
import { useGlobal } from "../../context/GlobalContext";

const Header = () => {
  const { enableWeb3, account, isWeb3Enabled, Moralis, isWeb3EnableLoading } =
    useMoralis();
  const { updateStates } = useGlobal();

  const handleConnectWallet = async () => {
    try {
      await enableWeb3();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isWeb3Enabled) return;
    const lastState = localStorage.getItem("Moralis::isWeb3Enabled");
    if (lastState) {
      handleConnectWallet();
    } else {
      localStorage.setItem("Moralis::isWeb3Enabled", false);
    }
  }, [isWeb3Enabled]);

  useEffect(() => {
    Moralis.onAccountChanged((account) => {
      if (account) {
        window.localStorage.setItem("Moralis::isWeb3Enabled", true);
        console.log("Account changed:", account);
      } else {
        console.log("No account found");
      }
    });
  }, [Moralis]);

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <Link to="/">
          <img src={flipcoinLogoImage} className={styles.logo} alt="Flipcoin" />
        </Link>
        <Link to="/">
          <img
            src={flipcoinImage}
            className={styles.logo_text}
            alt="Flipcoin"
          />
        </Link>
        {account ? (
          <div className={styles.account}>
            <span>{account}</span>
          </div>
        ) : (
          <button
            className={styles.button}
            onClick={handleConnectWallet}
            disabled={isWeb3EnableLoading}
          >
            Connect Wallet
          </button>
        )}
      </div>
      <ul className={styles.navbar}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/partner">Partner</Link>
        </li>
        <li>
          <Link to="/owner">Owner</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
