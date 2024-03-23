import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/baseApi";
import { useDispatch } from "react-redux";


import Toastify  from 'toastify-js'
import Spinner from "../components/utility/Spinner";

const Signup = () => {

  const [loading, setIsLoading]= useState(false);
  const navigate = useNavigate()
  const [singupData, setsingupData] = useState({
    name:'',
    email: "",
    password: "",
  });
  const onChangeHaneller = (event) => {

    setsingupData((preData) => ({
      ...preData,
      [event.target.name]: event.target.value,
    }));
  };
  const dispatch= useDispatch();
  const onSubmitHaneller =async (event) => {
    setIsLoading(true)
    event.preventDefault();
    try {
      const result= await api.post('/user/register',singupData);
      console.log(result?.data)
      dispatch({
        type:'user',
        payload:result?.data?.data
      })
        
      console.log(result?.data);
      if(result?.data);
     {
        setIsLoading(false);
        Toastify({
          text: result?.data?.msg,
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "center", // `top` or `bottom`
          position: "center", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
          // onClick: function(){} // Callback after click
        }).showToast();
        navigate('/')
        
      }
    localStorage.setItem('auth-token',result?.token)

    } catch (error) {
      console.log(error);

      setIsLoading(false)
      Toastify({
        text: error?.response?.data?.msg,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "center", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        // onClick: function(){} // Callback after click
      }).showToast();
    }
  };
  


  return (
    <div className="fixed inset-0 bg-primary -z-10 max-w-screen-xl mx-auto flex items-center justify-center">
      
      {loading? <Spinner/>:
      
      <form
       onSubmit={onSubmitHaneller}
       className="bg-secondary rounded  p-5">
        <h1 className=" text-white text-center font-semibold">Signup</h1>
        <div className="flex flex-col-reverse">
          <input
            onChange={onChangeHaneller}
            name="name"
            value={singupData.name}
            id="name"
            type="text"
            placeholder="name"
            className=" bg-transparent p-1
                     rounded border-2
                      border-dark-subtle 
                      focus:border-white
                       w-full text-lg
                        outline-none
                         peer
                         transition
                         focus:bg-white 
                        "
          />
          <label
            htmlFor="name"
            className=" 
                     font-semibold text-dark-subtle
                    border-dark-subtle 
                     peer-focus:text-white
                     transition
                     self-start
                    
                       "
          >
            name
          </label>
        </div>
        <div className="flex flex-col-reverse pt-3">
          <input
            onChange={onChangeHaneller}
            name="email"
            value={singupData.email}
            id="email"
            type="text"
            placeholder="email@email.com"
            className=" bg-transparent p-1
                     rounded border-2
                      border-dark-subtle 
                      focus:border-white
                       w-full text-lg
                        outline-none
                         peer
                         transition
                      active:bg-white    
                       focus:bg-white                    "
          />
          <label
            htmlFor="email"
            className=" 
                     font-semibold text-dark-subtle
                    border-dark-subtle 
                     peer-focus:text-white
                     transition
                     self-start
                    
                       "
          >
            Email
          </label>
        </div>

        <div className="flex flex-col-reverse pt-3">
          <input
            onChange={onChangeHaneller}
            name="password"
            value={singupData.password}
            id="password"
            type="text"
            placeholder="password"
            className=" bg-transparent 
                     rounded border-2
                      border-dark-subtle 
                      focus:border-white
                       w-full text-lg
                        outline-none
                         peer
                         transition
                         focus:bg-white s
                             p-1                        
                        "
          />
          <label
            htmlFor="password"
            className=" 
                     font-semibold text-dark-subtle
                    border-dark-subtle 
                     peer-focus:text-white
                     transition
                     self-start
                       "
          >
            Password
          </label>
        </div>
        <div className="pt-3">
          <button type="submit" className="rounded bg-white w-full p-1 h-8">
            Submit
          </button>
        </div>
        <div className="flex justify-between pt-3">
          <div className=" py text-dark-subtle hover:text-white transition"><Link to='/auth/forgot-password'>Forget Password</Link></div>
          <div className=" text-dark-subtle  hover:text-white transition"><Link to='/auth/signin'>Signin</Link></div>
       
        </div>
      </form>
}
    </div>
  );
};

export default Signup;
