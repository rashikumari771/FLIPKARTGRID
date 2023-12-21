import React, { useRef, useState } from "react";
import Header from "../../components/Header/Header";
import { useGlobal } from "../../context/GlobalContext";
import ownerStyles from "../Owner/Owner.module.css";
import TransactionsTable from "../../components/TransactionsTable/TransactionsTable";
import iphone from "../../assets/iphone.jpg";
import ac from "../../assets/ac.webp";
import fridge from "../../assets/fridge.webp";
import watch from "../../assets/watch.webp";
import laptop from "../../assets/laptop.jpg";
import styles from "./Home.module.css";
import flipkartVoucher from "./../../assets/flipkart-voucher.png";
import googleVoucher from "./../../assets/googleplay-voucher.webp";
import amazonVoucher from "./../../assets/amazon-voucher.webp";

const Home = () => {
  const {
    transactions,
    transferTokens,
    partners,
    rewardTokens,
    account,
    balance,
    redeemRewards,
  } = useGlobal();
  const products = [
    {
      name: "iPhone 14S",
      price: "150000",
      image: iphone,
      partner: partners[Math.floor(Math.random() * partners.length)],
    },
    {
      name: "LG Air Conditioner",
      price: "45000",
      image: ac,
      partner: partners[Math.floor(Math.random() * partners.length)],
    },
    {
      name: "Samsung Refrigerator",
      price: "30000",
      image: fridge,
      partner: partners[Math.floor(Math.random() * partners.length)],
    },
    {
      name: "Titan Class GOLD",
      price: "7990",
      image: watch,
      partner: partners[Math.floor(Math.random() * partners.length)],
    },
    {
      name: "ASUS Something Series",
      price: "79000",
      image: laptop,
      partner: partners[Math.floor(Math.random() * partners.length)],
    },
  ];
  const redeemCoupons = [
    {
      name: "Flipkart Voucher",
      price: "500",
      tokens: "90",
      image: flipkartVoucher,
    },
    {
      name: "Amazon Voucher",
      price: "100",
      tokens: "10",
      image: amazonVoucher,
    },
    {
      name: "GooglePlay Voucher",
      price: "1000",
      tokens: "150",
      image: googleVoucher,
    },
  ];

  return (
    <div>
      <Header />
      <div className={ownerStyles.container}>
        <h1 className={ownerStyles.heading}>Welcome to Flipkart!</h1>
        <section className={styles.products}>
          {products.map((product, index) => (
            <ProductCard
              product={product}
              key={index}
              rewardTokens={rewardTokens}
            />
          ))}
        </section>
        <h2 className={ownerStyles.heading}>Redeem Rewards</h2>
        <h3 className={ownerStyles.subheading}>Current Balance: {balance}</h3>
        <section className={styles.rewards}>
          {redeemCoupons.map((product, index) => (
            <RewardCard
              product={product}
              key={index}
              redeemTokens={redeemRewards}
              balance={balance}
            />
          ))}
        </section>
        <section className={ownerStyles.forms}>
          <TransferTokens transferTokens={transferTokens} />
        </section>
        <TransactionsTable transactions={transactions} account={account} />
      </div>
    </div>
  );
};

const ProductCard = ({ product, rewardTokens }) => {
  const handleRewards = async (e) => {
    e.preventDefault();
    rewardTokens({
      partnerAddress: product.partner.address,
      amount: product.price,
    });
  };

  return (
    <div className={styles.productCard}>
      <div className={styles.productCardImage}>
        <img src={product.image} alt="product" />
      </div>
      <div className={styles.productCardInfo}>
        <h3 className={styles.productCardName}>{product.name}</h3>
        <p className={styles.productCardPrice}>{product.price}</p>
        <button className={styles.buy} onClick={handleRewards}>
          Buy
        </button>
      </div>
    </div>
  );
};

const RewardCard = ({ product, redeemTokens, balance }) => {
  const isRedeemable = parseInt(product.tokens) <= parseInt(balance);
  const handleRedeem = async (e) => {
    e.preventDefault();
    redeemTokens({
      amount: product.tokens,
    });
  };

  return (
    <div className={styles.redeemCard}>
      <div className={styles.redeemCardImage}>
        <img src={product.image} alt="redeem" />
      </div>
      <div className={styles.redeemCardInfo}>
        <h3 className={styles.redeemCardName}>{product.name}</h3>
        <p className={styles.redeemCardPrice}>{product.price}</p>
        <button
          className={styles.buy}
          disabled={!isRedeemable}
          onClick={handleRedeem}
        >
          {!isRedeemable ? "Insuffient Coins" : product.tokens + " Flipcoins"}
        </button>
      </div>
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

export default Home;
