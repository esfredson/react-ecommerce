import React, { Fragment, useState, useEffect } from "react";
import MetaData from "../layout/MetaData";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userAction";
import Loader from "../layout/Loader";

// creamos el componente security/Login
const Login = () => {

  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const [email, setEmail] = useState(""); // variable local que administra el email
  const [password, setPassword] = useState(""); // variable local que administra el password
  // capturo variables globales de la aplicacion
  const { loading, errores, isAuthenticated } = useSelector((state) => state.security);

  // lo primero es saber si estoy autenticado (el login fue exitoso) o no.
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (errores) {
      errores.map((error) => alert.error(error));
    }
  }, [dispatch, alert, isAuthenticated, errores, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(
        { email, password }
      ));
  };

  if (loading) {
    return (<Loader />);
  }

  return (

    // agregamos el tag de metadata y el fragment para poder contener 2 componentes
    <Fragment>
      <MetaData title={"Login"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          {/* agregamos la funcion submit del formulario */}
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-3">Login</h1>

            {/* cuadro de entrada del email. Jugamos con la variable de estado local email */}
            <div className="form-group">
              <label htmlFor="email_field">Email</label>            
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* cuadro de entrada del password. Jugamos con la variable de estado local password */}
            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Link
              to="/password/forgot"
              className="float-right mb-4">
                Olvidó el Password?
            </Link>

            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
            >
              LOGIN
            </button>

            <Link
              to="/register"
              className="float-right mt-3">
                Nuevo Usuario?
            </Link>

          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
