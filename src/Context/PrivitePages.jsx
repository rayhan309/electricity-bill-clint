import { use } from 'react';
import { AuthContext } from './AuthContext';
import { Navigate } from 'react-router';

const PrivitePages = ({children}) => {
    const {user, loading} = use(AuthContext);

    if(loading) {
        return <p>Loading.....</p>
    }

    if(user){
        return children;
    }

    return <Navigate to={'/signUp'}></Navigate>
};

export default PrivitePages;