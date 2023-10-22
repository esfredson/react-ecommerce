import React, { useState, useEffect, Fragment } from "react";
import MetaData from "../layout/MetaData";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../actions/userAction";

// creamos este nuevo componente security/Register
const Register = () => {
  const navigate = useNavigate();

  // declaramos la variable local user, con sus atributos o propiedades y su valor inicial.
  const [user, setUser] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    username: "",
    password: "",
  });

  //quiero trabajar directamente con las propiedades del objeto user.
  //para ello procedo a hacer una desestructuración del objeto user.
  const { nombre, apellido, password, telefono, email, username } = user;

  //declaro la variable de estado local para la imagen de perfil
  const [avatar, setAvatar] = useState("");

  //el avatar tiene distintos estados: el avatar que procede del backend
  //y el avatar que quiero subir para actualizarlo: a este lo llamo avatarPreview
  const [avatarPreview, setAvatarPreview] = useState("images/default_avatar.jpg");

  const alert = useAlert();

  const dispatch = useDispatch();

  //necesito obtener valores de estado global que me indiquen si el usuaruio esta en sesion
  const { errores, isAuthenticated } = useSelector((state) => state.security);

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
    // la data se envia al servidor con un tipo multipart form
    // creamos un objeto formData y lo seteamos con sus valores
    const formData = new FormData();
      formData.set("nombre", nombre);
      formData.set("apellido", apellido);
      formData.set("telefono", telefono);
      formData.set("email", email);
      formData.set("username", username);
      formData.set("password", password);
      formData.set("foto", avatar);
    dispatch(register(formData));
  };

  const onChange = (e) => {
    // logica para tratar el control imagen avatar
    if (e.target.name === "avatar") {
      // instancio a un objeto que de lectura al archivo imagen
      const reader = new FileReader();
      reader.onload = () => {
        // cuando la imagen ya se ha cargado (readyState=2)
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(e.target.files[0]);
        }
      };
      if(e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
      }
      
    }
    else {
      // logica para el resto de controles distintos al avatar
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  return (
    // iniciamos con Fragment y Metadata
    <Fragment>
      <MetaData title={"Registro de usuario"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">

          <form
            className="shadow-lg"
            encType="multipart/form-data"
            onSubmit={submitHandler}
          >
            <h1 className="mb-3">Registrar Usuario</h1>

            {/* caja de texto nombre */}
            <div className="form-group">
              <label htmlFor="nombre_field">Nombre</label>
              <input
                type="text"
                id="nombre_field"
                className="form-control"
                value={nombre}
                name="nombre"
                onChange={onChange}
              />
            </div>

            {/* caja de texto apellido */}
            <div className="form-group">
              <label htmlFor="apellido_field">Apellido</label>
              <input
                type="text"
                id="apellido_field"
                className="form-control"
                value={apellido}
                name="apellido"
                onChange={onChange}
              />
            </div>

            {/* caja de texto telefono */}
            <div className="form-group">
              <label htmlFor="telefono_field">Telefono</label>
              <input
                type="text"
                id="telefono_field"
                className="form-control"
                value={telefono}
                name="telefono"
                onChange={onChange}
              />
            </div>

            {/* caja de texto username */}
            <div className="form-group">
              <label htmlFor="username_field">Username</label>
              <input
                type="text"
                id="username_field"
                className="form-control"
                value={username}
                name="username"
                onChange={onChange}
              />
            </div>

            {/* caja de texto email */}
            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                name="email"
                onChange={onChange}
              />
            </div>

            {/* caja de texto password */}
            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                name="password"
                onChange={onChange}
              />
            </div>

            {/* control de upload de imagenes */}
            <div className="form-group">
              <label htmlFor="avatar_upload">Avatar</label>
              <div className="d-flex align-items-center">
                <div>
                  <figure className="avatar mr-3 item-rtl">
                    <img
                      src={avatarPreview}
                      className="rounded-circle"
                      alt="Imagen Previa"
                    />
                  </figure>
                </div>

                <div className="custom-file">
                  <input
                    type="file"
                    name="avatar"
                    className="custom-file-input"
                    id="customFile"
                    accept="images/*"
                    onChange={onChange}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Upload Avatar
                  </label>
                </div>
              </div>
            </div>

            <button
              id="register_button"
              type="submit"
              className="btn btn-block py-3"
            >
              Registrar
            </button>

          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
