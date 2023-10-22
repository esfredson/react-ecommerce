import { Navigate, Outlet } from "react-router-dom";
import { parseToken } from "../../utilities/parseToken";



const ProtectedRoute = ({existsRoles}) => {

    const token = localStorage.getItem('token');
    if(!token)
    {
        return <Navigate to="/login" />;
    }

    if(!existsRoles)
    {
        return <Outlet />;
    }

    const payload = parseToken(token); // { 'nombre': 'vaxi', 'apellido': 'drez', 'role': []}

    const {role} = payload;

    if(Array.isArray(role))
    {
        const isFounded = role.some(ai => existsRoles.includes(ai));
        return isFounded ? <Outlet /> : <Navigate to="/login" />;
    }else{
        return existsRoles.includes(role) ? <Outlet /> : <Navigate to="/login" />
    }
}

export default ProtectedRoute;

