import React from "react";
// reactstrap components
import { Container } from "reactstrap";
export default function PageHeader() {
  
  return (
    <div className="page-header header-filter">
      <div className="squares square1" />
      <div className="squares square2" />
      <div className="squares square3" />
      <div className="squares square4" />
      <div className="squares square5" />
      <div className="squares square6" />
      <div className="squares square7" />
      <Container>
        <div className="content-center brand">
          <h1 className="h1-seo">COSMOS</h1>
          <h4 className="d-none d-sm-block">
          Welcome to Cosmos, where E-commerce loyalty meets blockchain 
          innovation. Seamlessly earn, track, and redeem rewards in a transparent 
          and secure ecosystem.
          </h4>
        </div>
      </Container>
    </div>
  );
}
