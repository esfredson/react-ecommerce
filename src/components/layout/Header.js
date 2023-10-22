import React, { Fragment } from "react";
import "../../App.css";
import Search from "./Search";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { logout } from "../../slices/securitySlice";
import { Link } from "react-router-dom";

// modifico el componente Header para mostrar al usuario activo
const Header = () => {
  const { user } = useSelector(state => state.security);
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

        {/* sustituyo el html estatico en el Header por el nuevo componente Search */}
        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <Search />
        </div>

        {/* interfaz grafica del carrito de compras y del menu usuario  */}
        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <span id="cart" className="ml-3">
            Cart
          </span>
          <span id="cart_count" className="ml-1">
            2
          </span>

          {
            user
            ?
            (
              <div className="ml-4 dropdown d-inline">
                <Link
                  to="#!"
                  className="btn dropdown-toggle text-white mr-4"
                  type="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <figure className="avatar avatar-nav">
                    <img
                    // si existe user, entonces pinta el user.avatar
                      src={user && user.avatar}
                      alt={user && user.nombre}
                      className="rounded-circle"
                    />
                  </figure>
                  <span>{user && user.nombre}</span>
                </Link>

                {/* menu dropdown */}
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropDownMenuButton">
                  {/* para mostrar el menu dashboard necesito ser usuario administrador */}
                  {
                    user && user.roles.includes("ADMIN") && (
                      <Link
                        to="/dashboard"
                        className="dropdown-item" >
                          Dashboard
                      </Link>
                    )
                  }

                  {/* para mostrar el resto de menus no necesito ser administrador */}
                  <Link
                    to="/orders/me"
                    className="dropdown-item" >
                      Ordenes
                  </Link>

                  <Link
                    to="/me"
                    className="dropdown-item" >
                      Perfil
                  </Link>

                  <Link
                    to="/"
                    className="dropdown-item"
                    onClick={logoutHandler}>
                      Logout
                  </Link>
                </div>
              </div>
            )
            :
            (
              <Link
                to="/login"
                className="btn ml-4"
                id="login_btn" >
                  Login
              </Link>
            )
          }
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
