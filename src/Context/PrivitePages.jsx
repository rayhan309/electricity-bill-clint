import { use } from 'react';
import { AuthContext } from './AuthContext';
import { Navigate } from 'react-router';
import Loading from '../Components/Laoding/Laoding';

const PrivitePages = ({children}) => {
    const {user, loading} = use(AuthContext);

    if(loading) {
        return <Loading />
    }

    if(user){
        return children;
    }

    return <Navigate to={'/signUp'}></Navigate>
};

export default PrivitePages;