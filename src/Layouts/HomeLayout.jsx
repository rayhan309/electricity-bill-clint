import { Outlet } from 'react-router';
import Navber from '../Components/Navber/Navber';

const HomeLayout = () => {
    return (
        <div>
            <Navber />
            <Outlet />
        </div>
    );
};

export default HomeLayout;