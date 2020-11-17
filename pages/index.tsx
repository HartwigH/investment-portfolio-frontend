import React from "react";
import Typed from "react-typed";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";
import Router from "next/router";
import { Container, Row, Col, Button } from "reactstrap";

const Home: React.FC = () => {

  const cta = () => {
    Router.push("/login")
  }

  return (
    <BaseLayout className="home">
      <BasePage>
      <div className="main-section">
        <div className="background-image">
          <img
            className="background-image-cover"
            src="/static/images/background-index.png"
          />
        </div>

        <Container className="index-page">
          <Row>
            <Col md="6">
              <div className="hero-section">
                <img className="image" src="/static/images/hero.png" />
                <div className="hero-section-content">
                  <h2> Monitor your portfolio growth </h2>
                  <div className="hero-section-content-intro">
                    Everythin from one place, automatic price updates. Never
                    forget again where your important financial assets are
                    located.
                  </div>
                </div>
              </div>
            </Col>
            <Col md="6" className="hero-welcome-wrapper">
              <div className="hero-welcome-text">
                <h1>
                  Are you tired of monitoring your financial protfolio from
                  excel?
                </h1>
              </div>

              <Typed
                loop
                typeSpeed={60}
                backSpeed={60}
                strings={[
                  "Overview of Crypto",
                  "Overview of Stocks",
                  "From one place",
                ]}
                loopCount={0}
                showCursor
                className="self-typed"
                cursorChar="|"
                smartBackspace
              />

              <div className="hero-welcome-bio">
                <h1>
                  Track portfolio growth, know where's your stocks & crypto,
                  ready?{" "}
                </h1>
                <Button className="orange-button" onClick={cta}>
                  Get Started
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      </BasePage>
    </BaseLayout>
  );
};
export default Home;
