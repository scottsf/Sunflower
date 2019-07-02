import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import Signout from "./auth/Signout";
import { SearchConsumer } from "../context";

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
  <SearchConsumer>
    {({ updateSearch }) => (
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
            <NavLink to="/post/add">Add post</NavLink>
          </li>
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
          <li>
            <NavLink to="/favorite">Favorite</NavLink>
          </li>
          <li>
            <input
              type="text"
              placeholder="Search post"
              onChange={event => {
                updateSearch(event.target.value);
              }}
            />
          </li>
          <li>
            <Signout />
          </li>
        </ul>
      </Fragment>
    )}
  </SearchConsumer>
);

const NavbarUnAuth = () => (
  <SearchConsumer>
    {({ updateSearch }) => (
      <ul>
        <li>
          <NavLink to="/" exact>
            Home
          </NavLink>
        </li>
        <li>
          <input
            type="text"
            placeholder="Search post"
            onChange={event => {
              updateSearch(event.target.value);
            }}
          />
        </li>
        <li>
          <NavLink to="/signin">Signin</NavLink>
        </li>
        <li>
          <NavLink to="/signup">Signup</NavLink>
        </li>
      </ul>
    )}
  </SearchConsumer>
);

export { Navbar as default };
