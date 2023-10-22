import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../layout/Loader';
import { Link } from 'react-router-dom';


const Profile = () => {

    const {user, loading} = useSelector(state=> state.security);

    if(loading) {
        return (<Loader />);
    }
    
  return (
    <Fragment>
        <h2 class="mt-5 ml-5">Mi Perfil</h2>
        <div class="row justify-content-around mt-5 user-info">
            <div class="col-12 col-md-3">
                <figure class='avatar avatar-profile'>
                    <img class="rounded-circle img-fluid" src={user && user.avatar} alt={user.nombre} />
                </figure>
                <Link
                    to="#"
                    id="edit_profile"
                    class="btn btn-primary btn-block my-5">
                        Editar Perfil
                </Link>
            </div>
     
            <div class="col-12 col-md-5">
                 <h4>Nombre</h4>
                 <p>{user && user.nombre}</p>

                 <h4>Apellido</h4>
                 <p>{user && user.apellido}</p>

                 <h4>Telefono</h4>
                 <p>{user && user.telefono}</p>
     
                 <h4>Username</h4>
                 <p>{user && user.userName}</p>
      
                 <h4>Email</h4>
                 <p>{user && user.email}</p>

                 {
                    user && !user.roles.includes('ADMIN') && (
                        <Link
                            to="/orders/me"
                            class="btn btn-danger btn-block mt-5">
                                Mis Ordenes
                        </Link>
                    )
                 }

                <Link
                    to="/password/update"
                    class="btn btn-primary btn-block mt-3">
                        Cambiar Password
                </Link>
            </div>
        </div>
    </Fragment>
  )
}

export default Profile