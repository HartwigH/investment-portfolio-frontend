import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";
import { login } from "../actions";
import { useState } from "react";
import Router from "next/router";
import {
  Alert,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col,
  Jumbotron,
} from "reactstrap";
import { setCookie, parseCookies } from "nookies";

const Login: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onDismiss = () => setVisible(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    const loginInfo = {
      identifier: username,
      password: password,
    };

    const loginResponse = await login(loginInfo);

    if (loginResponse === 400) {
      setVisible(true);
      setErrorMessage("Username or password is wrong! try again.");
    } else if (loginResponse === 0) {
      setVisible(true);
      setErrorMessage("No server connection.");
    } else if (typeof loginResponse === 'object') {
      setCookie(null, "jwt", loginResponse.jwt, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      Router.push("/manager");
    }
  }

  // If user is already loggedin push to manager 
  const cookies = parseCookies().jwt;
  if (cookies) {
    Router.push("/manager");
  }

  return (
    <BaseLayout>
      <BasePage>
        <Jumbotron>
          <Container>
            <Row>
              <Col md="6">
                <div className="login">
                  <Alert color="danger" isOpen={visible} toggle={onDismiss}>
                    {errorMessage}
                  </Alert>
                  <h2>Welcome back!</h2>
                  <Form>
                    <FormGroup>
                      <Label for="userName">Username</Label>
                      <Input
                        className="custom-input"
                        name="user"
                        id="userName"
                        placeholder="username here..."
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="password">Password</Label>
                      <Input
                        className="custom-input"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="password here..."
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                      />
                    </FormGroup>
                    <Button
                      className="green-button-sm"
                      onClick={() => handleLogin()}
                    >
                      Login
                    </Button>
                  </Form>
                  <Alert color="warning" className="info">
                    <p>
                      Username: bob <br />
                      Password: Password
                    </p>
                    <hr />
                    <p className="mb-0">
                      Username: tim <br />
                      Password: Password
                    </p>
                  </Alert>
                </div>
              </Col>
              <Col md="6">
                <div className="register">
                  <h1>New? Register below</h1>
                  <Form>
                    <FormGroup>
                      <Label for="user">Username</Label>
                      <Input
                        name="user"
                        placeholder="not implemented yet..."
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="email">Email</Label>
                      <Input
                        name="email"
                        placeholder="not implemented yet..."
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="pw">Password</Label>
                      <Input
                        type="password"
                        name="pw"
                        placeholder="not implemented yet.."
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="pw">Password Again</Label>
                      <Input
                        type="password"
                        name="pw"

                        placeholder="not implemented yet.."
                      />
                    </FormGroup>
                    <Button className="orange-button-sm" onClick={e => e.preventDefault}>Register</Button>
                  </Form>
                </div>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
      </BasePage>
    </BaseLayout>
  );
};

export default Login;
