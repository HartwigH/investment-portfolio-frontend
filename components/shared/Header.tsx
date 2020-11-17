import Link from "next/link";
import React, { useState } from "react";
import { parseCookies, destroyCookie } from "nookies";
import Router from "next/router";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from "reactstrap";

const BsNavLink = (props) => {
  const { route, title } = props;

  return (
    <Link href={route}>
      <a className={`nav-link port-navbar-link`}>{title}</a>
    </Link>
  );
};

const isAuthenticated = (str) => {
  return !str || 0 === str.length;
};

const Login = () => {
  return (
    <span
      onClick={() => Router.push("/login")}
      className="nav-link port-navbar-link clickable"
    >
      Login
    </span>
  );
};

const Logout = () => {
  return (
    <span
      onClick={() => destroyCookie(null, "jwt", Router.push("/"))}
      className="nav-link port-navbar-link clickable"
    >
      Logout
    </span>
  );
};

const home = () => {
  Router.push("/");
};

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const cookies = parseCookies().jwt;

  const menuOpenClass = isOpen ? 'menu-open' : 'menu-close';

  return (
    <div>
      <Navbar
        className={`port-navbar port-default absolute ${menuOpenClass}`}
        color="transparent"
        light
        expand="md"
      >
        <NavbarBrand className="port-navbar-brand clickable" onClick={home}>
          Investment Portfolio
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {isAuthenticated(cookies) && (
              <NavItem className="port-navbar-item">
                <BsNavLink route="/" title="Home" />
              </NavItem>
            )}
            {!isAuthenticated(cookies) && (
              <NavItem className="port-navbar-item">
                <BsNavLink route="/manager" title="Manager" />
              </NavItem>
            )}
            <NavItem className="port-navbar-item">
              <BsNavLink route="/about" title="About" />
            </NavItem>
            {isAuthenticated(cookies) && (
              <NavItem className="port-navbar-item">
                <Login />
              </NavItem>
            )}
            {!isAuthenticated(cookies) && (
              <NavItem className="port-navbar-item">
                <Logout />
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
