import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="main-head">
      <nav>
        <img
          src="https://cdn-icons-png.flaticon.com/512/2421/2421762.png"
          alt="logo"
          width="40px"
          height={"40px"}
          style={{ marginBottom: "14px" }}
        />
        <h1 id="logo" style={{ marginLeft: "10px" }}>
          <Link className="header_names" to="/" style={{fontSize:"35px"}}>
            Nerdcast
          </Link>
        </h1>

        <ul>
          <li>
            <Link className="header_names" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="header_names" to="/books">
              Books
            </Link>
          </li>
          <li>
            <Link className="header_names" to="/cart">
              Cart
            </Link>
          </li>
          <li>
            <Link className="header_names" to="/checkout">
              Checkout
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
