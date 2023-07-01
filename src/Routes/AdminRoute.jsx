import React, { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useAdmin from '../hooks/useAdmin';

const AdminRoute = ({children}) => {
      const {user, loading}=useAuth();
      const [isAdmin,isAdminLoading] = useAdmin();
      console.log('adr',isAdmin,' ',user)
      const location=useLocation();
      if(loading || isAdminLoading){
            return  <><progress className="progress progress-accent w-56" value="0" max="100"></progress>
            <progress className="progress progress-accent w-56" value="10" max="100"></progress>
            <progress className="progress progress-accent w-56" value="40" max="100"></progress>
           </>
      }
      if(user && isAdmin) {
            return children
      }

      return <Navigate to="/" state={{from:location}} replace></Navigate>
};

export default AdminRoute;