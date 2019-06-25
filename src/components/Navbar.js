import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import Signout from "./auth/Signout";

const Navbar = ({ session }) => (
  <nav>
    {session && session.me ? (
      <NavbarAuth session={session} />
    ) : (
      <NavbarUnAuth />
    )}
  </nav>
);

const NavbarAuth = ({ session }) => (
  <Fragment>
      <h2>
        Welcome <strong>{session.me.name}</strong>
      </h2>
    <ul className="navbar">
      <li>
        <NavLink to="/" exact>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/search">Search</NavLink>
      </li>
      <li>
        <NavLink to="/post/add">Add post</NavLink>
      </li>
      <li>
        <NavLink to="/profile">Profile</NavLink>
      </li>
      <li>
        <Signout />
      </li>
    </ul>
  </Fragment>
);

const NavbarUnAuth = () => (
  <ul>
    <li>
      <NavLink to="/" exact>
        Home
      </NavLink>
    </li>
    <li>
      <NavLink to="/search">Search</NavLink>
    </li>
    <li>
      <NavLink to="/signin">Signin</NavLink>
    </li>
    <li>
      <NavLink to="/signup">Signup</NavLink>
    </li>
  </ul>
);

export { Navbar as default };
