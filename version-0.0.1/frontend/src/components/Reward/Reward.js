import React from "react";
// reactstrap components
import Card from "./Card";
import { Col, Row, Container } from "reactstrap";
import iphone from "../../assets/img/iphone.jpg";
import ac from "../../assets/img/ac.webp";
import fridge from "../../assets/img/fridge.webp";
import watch from "../../assets/img/watch.webp";
import laptop from "../../assets/img/laptop.jpg";
import flipkartVoucher from "./../../assets/img/flipkart-voucher.png";
import googleVoucher from "./../../assets/img/googleplay-voucher.webp";
import amazonVoucher from "./../../assets/img/amazon-voucher.webp";
import { useGlobal } from "context/GlobalContext";

export default function Reward() {
  const { redeemRewards, rewardTokens, partners } = useGlobal();
  const products = [
    {
      name: "iPhone 14S",
      price: "150000",
      image: iphone,
      partner: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    },
    {
      name: "LG Air Conditioner",
      price: "45000",
      image: ac,
      partner: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    },
    {
      name: "Samsung Refrigerator",
      price: "30000",
      image: fridge,
      partner: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    },
    {
      name: "Titan Class GOLD",
      price: "7990",
      image: watch,
      partner: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    },
    {
      name: "ASUS Something Series",
      price: "79000",
      image: laptop,
      partner: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    },
  ];
  const rewards = [
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
    <Container>
      <div className="space" />
      <h3>Products</h3>
      <Row>
        {products.map((reward, index) => (
          <Col key={index} xs="12" md="4">
            <Card
              reward={reward}
              onClick={() =>
                rewardTokens({
                  amount: reward.price,
                  partnerAddress: reward.partner,
                })
              }
              buttonText="Buy"
            />
          </Col>
        ))}
      </Row>
      <h3>Rewards</h3>
      <Row>
        {rewards.map((reward, index) => (
          <Col key={index} xs="12" md="4">
            <Card
              reward={reward}
              onClick={() => redeemRewards({ amount: reward.tokens })}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
