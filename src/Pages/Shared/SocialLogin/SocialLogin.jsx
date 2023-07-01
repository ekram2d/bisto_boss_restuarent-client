import React, { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { AuthContext } from '../../../Providers/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';

const SocialLogin = () => {


      const { googleSignIn}=useContext(AuthContext)
      const navigate=useNavigate();
  const location=useLocation();
  const from =location.state?.from?.pathname || "/"
      const handleGoogle=()=>{
            googleSignIn()
            .then(result=>{
                  const loggedInUser = result.user;
                  console.log(loggedInUser);
                  const saveUser ={name:loggedInUser.displayName,email:loggedInUser.email}
                  fetch('https://bistro-boss-server-pink.vercel.app/users',{
                   method:'POST',
                   headers:{
                     'content-type':'application/json'
                   },
                   body:JSON.stringify(saveUser)
                  }
                  )
                  .then(res=>res.json())
                  .then(()=>{
                
                        navigate(from,{replace:true});
     
                   
                  })
                
            })
      }
      return (
            <div>
                  <div className='divider'></div>
                  
                 <div className='w-full text-center my-6'>
                 <button onClick={handleGoogle} className="btn btn-circle btn-outline">
                       <FaGoogle></FaGoogle>
                  </button>
                 </div>
            </div>
      );
};

export default SocialLogin;