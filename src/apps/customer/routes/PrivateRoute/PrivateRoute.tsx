
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

interface RootState {
    auth: {
      user: {
        _id: string;
        name: string;
        phoneNumber: string;
      } | null;
    };
  }

const PrivateRoute = () => {
    const {user} = useSelector((state: RootState)=> state.auth);

    return( user ? <Outlet/> : <Navigate to='/' replace /> );
};

export default PrivateRoute