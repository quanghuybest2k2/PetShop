import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Dropdown } from "react-bootstrap";

import swal from "sweetalert";
import axios from "axios";

function Navbar() {
  const [t, i18n] = useTranslation("global");

  const switchLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const history = useHistory();
  const logoutSubmit = (e) => {
    e.preventDefault();

    axios.post(`logout`).then((res) => {
      if (res.data.status === 200) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_name");
        swal("Success", res.data.message, "success");
        history.push("/");
      }
    });
  };

  var AuthButtons = "";
  if (!localStorage.getItem("auth_token")) {
    AuthButtons = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            {t("header.login")}
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            {t("header.login")}
          </Link>
        </li>
      </ul>
    );
  } else {
    AuthButtons = (
      <li className="nav-item">
        <button
          type="button"
          onClick={logoutSubmit}
          className="btn btn-danger btn-sm text-white mt-1"
        >
          {t("header.logout")}
        </button>
      </li>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg shadow sticky-top bg-light">
      <div className="container">
        <Link className="navbar-brand text-capitalize" to="/">
          {t("header.petshop")}
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                {t("header.home")}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                {t("header.about")}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/album">
                {t("header.album")}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/collections">
                {t("header.collection")}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                {t("header.contact")}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                {t("header.cart")}
              </Link>
            </li>
            {AuthButtons}
            <li className="nav-item">
              <Dropdown>
                <Dropdown.Toggle
                  variant="link"
                  id="dropdown-basic"
                  style={{ border: "none", boxShadow: "none" }}
                >
                  {i18n.language === "en" ? (
                    <img
                      src={process.env.PUBLIC_URL + "/images/usa.png"}
                      alt="USA"
                    />
                  ) : (
                    <img
                      src={process.env.PUBLIC_URL + "/images/vietnam.png"}
                      alt="VN"
                    />
                  )}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => switchLanguage("en")}>
                    English
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => switchLanguage("vi")}>
                    Tiếng Việt
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
