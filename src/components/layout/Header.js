import React, { Fragment } from "react";
import "../../App.css";
import Search from "./Search";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { logout } from "../../slices/securitySlice";
import { Link } from "react-router-dom";

const Header = () => {
  const { user } = useSelector((state) => state.security);
  const dispatch = useDispatch();
  const alert = useAlert();

  const logoutHandler = () => {
    dispatch(logout());
    alert.success("Salió de sesión exitosamente");
  };

  
  return (
    <Fragment>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <img src="/images/logo_vaxi.png" alt="sin contenido" />
          </div>
        </div>

        {/* sustituyo el html estatico en el Header por el nuevo componente creado Search */}
        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <Search />
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <span id="cart" className="ml-3">
            Cart
          </span>
          <span id="cart_count" className="ml-1">
            2
          </span>

          {user ? (
            <div className="ml-4 dropdown d-inline">
              <Link
                to="#!"
                className="btn dropdown-toggle text-white mr-4"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <figure className="avarar avatar-nav">
                  <img
                    src={user && user.avatar}
                    alt={user && user.nombre}
                    className="rounded-circle"
                  />
                </figure>
                <span>{user && user.nombre}</span>
              </Link>
              <div
                className="dropdown-menu"
                aria-labelledby="dropDownMenuButton"
              >
                {user && user.roles.includes("ADMIN") && (
                  <Link className="dropdown-item" to="/dashboard">
                    Daskboard
                  </Link>
                )}

                <Link className="dropdown-item" to="/orders/me">
                  Ordenes
                </Link>

                <Link className="dropdown-item" to="/me">
                  Perfil
                </Link>

                <Link className="dropdown-item" to="/" onClick={logoutHandler}>
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            <Link className="btn ml-4" id="login_btn" to="/login">
              Login
            </Link>
          )}
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
