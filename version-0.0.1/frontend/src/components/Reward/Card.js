import React from "react";
import styles from "./Card.module.css";
import { Button } from "reactstrap";

const Card = ({ reward, onClick, buttonText }) => {
  return (
    <div className={styles.card}>
      <img src={reward.image} alt={reward.name} className={styles.avatar} />
      <div className={styles.bio}>
        <h4 className={styles.name}>{reward.name}</h4>
        <h5 className={styles.price}>{reward.price}</h5>
        <p className={styles.about}>{reward.about}</p>
      </div>
      <div className={styles.contact}>
        <Button onClick={onClick}>{buttonText || "Redeem"}</Button>
      </div>
    </div>
  );
};

export default Card;
