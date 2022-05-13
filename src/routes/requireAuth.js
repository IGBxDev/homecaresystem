import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/auth'

export default function RequireAuth({ children, redirectTo, isPrivate }) {

    const { signed, load } = useContext(AuthContext);

    function getAuth() {
        return signed;
    }

    if (load) {
        return (
            <div></div>
        )
    }

    let isAuthenticated = getAuth();

    if (isPrivate) {
        return isAuthenticated ? children : <Navigate to={redirectTo} />;
    }
    else {
        return isAuthenticated ? <Navigate to={redirectTo} /> : children;
    }
}