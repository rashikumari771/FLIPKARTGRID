import React, { useRef } from "react";
import classnames from "classnames";
import "./profile.css";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Label,
  FormGroup,
  Input,
  FormText,
  NavItem,
  NavLink,
  Nav,
  Table,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
import { useGlobal } from "context/GlobalContext";

export default function ProfileSection() {
  const { account, symbol, balance, transferTokens } = useGlobal();
  const [tabs, setTabs] = React.useState(1);
  const amountRef = useRef();
  const addressRef = useRef();

  const handleSend = (e) => {
    e.preventDefault();
    if (!amountRef.current || !addressRef.current) return;
    if (amountRef.current.value == "" || addressRef.current.value == "") return;
    console.log("Send");
    transferTokens({
      amount: amountRef.current.value,
      address: addressRef.current.value,
    }).then(() => {
      amountRef.current.value = "";
      addressRef.current.value = "";
    });
  };

  return (
    <>
      <img alt="..." className="dots" src={require("assets/img/dots.png")} />
      <Container className="align-items-center">
        <Row>
          <Col lg="6" md="6">
            <h4 className="profile-title text-left">{account}</h4>
            <h5 className="text-on-back">01</h5>
            <p className="profile-description">
              I am a creative problem solver and software engineer who thrives
              on innovation. I love learning, collaborating, and taking on
              challenges. Originally from Saharanpur, Uttar Pradesh, India, I
              enjoy exploring new ideas and creating meaningful experiences. In
              my free time, I indulge in music and competitive programming. I am
              driven, creative, and passionate about making a positive impact
              through technology.
            </p>
            <div className="btn-wrapper profile pt-3">
              <Button
                className="btn-icon btn-round"
                color="twitter"
                href=""
                id="tooltip639225725"
                target="_blank"
              >
                <i className="fab fa-twitter" />
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip639225725">
                Follow us
              </UncontrolledTooltip>
              <Button
                className="btn-icon btn-round"
                color="facebook"
                href=""
                id="tooltip982846143"
                target="_blank"
              >
                <i className="fab fa-facebook-square" />
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip982846143">
                Like us
              </UncontrolledTooltip>
            </div>
          </Col>
          <Col className="ml-auto mr-auto" lg="4" md="6">
            <Card className="card-coin card-plain">
              <CardHeader>
                <img
                  alt="..."
                  className="img-center img-fluid rounded-circle"
                  src={require("assets/img/mike.jpg")}
                />
                <h4 className="title">Transactions</h4>
              </CardHeader>
              <CardBody>
                <Nav className="nav-tabs-primary justify-content-center" tabs>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: tabs === 1,
                      })}
                      onClick={(e) => {
                        e.preventDefault();
                        setTabs(1);
                      }}
                      href="#pablo"
                    >
                      Wallet
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: tabs === 2,
                      })}
                      onClick={(e) => {
                        e.preventDefault();
                        setTabs(2);
                      }}
                      href="#pablo"
                    >
                      Send
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent
                  className="tab-subcategories"
                  activeTab={"tab" + tabs}
                >
                  <TabPane tabId="tab1">
                    <Table className="tablesorte" responsive>
                      <thead className="text-primary">
                        <tr>
                          <th className="header">COIN</th>
                          <th className="header">BALANCE</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{symbol}</td>
                          <td>{balance}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </TabPane>
                  <TabPane tabId="tab2">
                    <Row>
                      <Label sm="3">Pay to</Label>
                      <Col sm="9">
                        <FormGroup>
                          <input
                            placeholder="e.g. 0x1Nasd92348hU984353hfid"
                            type="text"
                            ref={addressRef}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label sm="3">Amount</Label>
                      <Col sm="9">
                        <FormGroup>
                          <input
                            placeholder="1587"
                            type="text"
                            ref={amountRef}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Button
                      className="btn-simple btn-icon btn-round float-right"
                      color="primary"
                      type="submit"
                      onClick={handleSend}
                    >
                      <i className="tim-icons icon-send" />
                    </Button>
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
