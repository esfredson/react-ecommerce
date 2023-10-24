import React, { useEffect, useState, Fragment } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetUpdateStatus } from "../../slices/securitySlice";
import MetaData from "../layout/MetaData";
import { update } from "../../actions/userAction";

const UpdateProfile = () => {
  const navigate = useNavigate();

  const [userSession, setUserSession] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
  });

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "images/default_avatar.jpg"
  );

  const alert = useAlert();

  const dispatch = useDispatch();

  const { errores, isAuthenticated, loading, user, isUpdated } = useSelector(
    (state) => state.security
  );

  useEffect(() => {
    if (isAuthenticated) {
      setUserSession({ ...user });
      setAvatarPreview(user.avatar);
    }
    if (errores) {
      errores.map((error) => alert.error(error));
    }
    if (isUpdated) {
      alert.success("Se actualizó exitosamente el usuario");
      navigate("/me");
      dispatch(resetUpdateStatus({}));
    }
  }, [dispatch, alert, errores, isAuthenticated, isUpdated, user, navigate]);

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(e.target.files[0]);
        }
      };
      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
      }
    } else {
      setUserSession({ ...userSession, [e.target.name]: e.target.value });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("nombre", userSession.nombre);
    formData.set("apellido", userSession.apellido);
    formData.set("telefono", userSession.telefono);
    formData.set("email", user.email);
    formData.set("username", user.username);
    formData.set("foto", avatar);
    dispatch(update(formData));
  };

  return (
    <Fragment>
      <MetaData title={"Actualizar perfil"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            className="shadow-lg"
            encType="multipart/form-data"
            onSubmit={submitHandler}
          >
            <h1 className="mt-2 mb-5">Actualizar Perfil</h1>

            <div className="form-group">
              <label htmlFor="nombre_field">Nombre</label>
              <input
                type="text"
                id="nombre_field"
                className="form-control"
                name="nombre"
                value={userSession.nombre}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="apellido_field">Apellido</label>
              <input
                type="text"
                id="apellido_field"
                className="form-control"
                name="apellido"
                value={userSession.apellido}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="telefono_field">Telefono</label>
              <input
                type="text"
                id="telefono_field"
                className="form-control"
                name="telefono"
                value={userSession.telefono}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="avatar_upload">Avatar</label>
              <div className="d-flex align-items-center">
                <div>
                  <figure className="avatar mr-3 item-rtl">
                    <img
                      src={avatarPreview}
                      className="rounded-circle"
                      alt="Avatar Preview"
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
                  <label
                    className="custom-file-label"
                    htmlFor="customFile"
                    disabled={loading ? true : false}
                  >
                    Seleccionar Avatar
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn update-btn btn-block mt-4 mb-3"
            >
              Guardar
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProfile;
