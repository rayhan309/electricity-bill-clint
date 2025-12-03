import axios from 'axios';
import { use, useEffect } from 'react';
import { AuthContext } from '../../Context/AuthContext';

const MyPyBills = () => {
    const {user} = use(AuthContext);
    useEffect(() => {
        axios(`http://localhost:3000/pyBills?email=${user?.email}`).then(res => console.log(res))
    }, [user?.email]);
    return (
        <div>
          
        </div>
    );
};

export default MyPyBills;