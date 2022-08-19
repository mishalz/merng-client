import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

import { AuthContext } from "../../context/Auth";

const Navbar = () => {
  const AuthCtx = useContext(AuthContext);
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substring(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);
  const logoutHandler = () => {
    AuthCtx.logout();
  };
  //<------LOGGED OUT CONTENT------->
  const LoggedOutContent = (
    <Menu pointing secondary color="teal">
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />
      <Menu.Menu position="right">
        <Menu.Item
          name="login"
          active={activeItem === "login"}
          onClick={handleItemClick}
          as={Link}
          to="/login"
        />
        <Menu.Item
          name="register"
          active={activeItem === "register"}
          onClick={handleItemClick}
          as={Link}
          to="/register"
        />
      </Menu.Menu>
    </Menu>
  );
  //<------LOGGED IN CONTENT------->
  const LoggedInContent = (
    <Menu pointing secondary color="teal">
      <Menu.Item
        name={AuthCtx.user ? AuthCtx.user.username : ""}
        active
        as={Link}
        to="/"
      />
      <Menu.Menu position="right">
        <Menu.Item name="logout" onClick={logoutHandler} />
      </Menu.Menu>
    </Menu>
  );

  const NavbarContent = AuthCtx.user ? LoggedInContent : LoggedOutContent;
  return NavbarContent;
};

export default Navbar;
