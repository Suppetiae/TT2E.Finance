import React, { useEffect, useState, useRef } from "react";

import Link from "next/link";
import NavItem from "./NavItem";

import { GiHamburgerMenu } from "react-icons/gi";

const MENU_LIST = [
  {
    text: "Home",
    href: "https://www.tt2e.finance/",
  },
  {
    text: "Official Links",
    href: "https://linktr.ee/tiktoken2earn",
  },
];

const Navbar = () => {
  const [navActive, setNavActive] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <header>
      <div className="container">
        <Link href={"/"}>
          <a className="logo" onClick={() => setActiveIdx(0)}></a>
        </Link>
        <div className="header-right">
          <div className="header-nav-wrapper">
            <button
              onClick={() => setNavActive(!navActive)}
              className="navbar-toggle-btn"
              data-navbar-toggle-btn>
              <GiHamburgerMenu />
            </button>

            <nav className={`navbar ${navActive ? "active" : ""} `} data-navbar>
              <div className="navbar-list">
                {MENU_LIST.map((menu, idx) => {
                  return (
                    <li
                      onClick={() => {
                        setActiveIdx(idx);
                        setNavActive(false);
                      }}
                      key={menu.text}>
                      <NavItem active={activeIdx === idx} {...menu} />
                    </li>
                  );
                })}
              </div>
            </nav>
          </div>

          <div class="header-actions"></div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
