import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

export default function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md="3">
            <h1 className="title">CMOS•</h1>
          </Col>
          <Col md="3">
          <Nav>
              <NavItem>
                <NavLink href="https://www.linkedin.com/in/avinesh-singh-070b58200/">
                  Contact Us
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
          <Col md="3">
            <Nav>
              <NavItem>
                <NavLink href="https://www.linkedin.com/in/avinesh-singh-070b58200/">
                  About Us
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
          <Col md="3">
            <h3 className="title">Follow us:</h3>
            <div className="btn-wrapper profile">
              <Button
                className="btn-icon btn-neutral btn-round btn-simple"
                color="default"
                href="https://twitter.com/avinesh_2003"
                id="tooltip622135962"
                target="_blank"
              >
                <i className="fab fa-twitter" />
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip622135962">
                Follow us
              </UncontrolledTooltip>
              <Button
                className="btn-icon btn-neutral btn-round btn-simple"
                color="default"
                href="https://www.facebook.com/avineshpratap.singh.12/"
                id="tooltip230450801"
                target="_blank"
              >
                <i className="fab fa-facebook-square" />
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip230450801">
                Like us
              </UncontrolledTooltip>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
