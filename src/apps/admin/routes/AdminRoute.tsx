import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
 interface AuthState {
    user: {
      _id: string;
      name: string;
      email: string;
      isAdmin: boolean;
    } | null;
  }

   interface RootState {
    auth: AuthState;
  
  }
const AdminRoute = () => {
    const {user} = useSelector((state:RootState)=> state.auth)
    return user && user.isAdmin? <Outlet/> : <Navigate to='/' replace/>
};

export default AdminRoute;