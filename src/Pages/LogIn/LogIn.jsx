import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../Components/Provider/AuthContext';
import Swal from 'sweetalert2';
import { FaEye } from 'react-icons/fa';
import { IoEyeOff } from 'react-icons/io5';



const Login = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  //console.log(location,navigate)
  const { logInUser, setUser, googleSignIn, setLoading } = useContext(AuthContext);

  const handleLogIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    logInUser(email, password)
      .then((res) => {
        setUser(res.user);
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(location.state || '/');
      })
      .catch((err) => {
        let message = "Login failed. Please try again.";
        switch (err.code) {
          case "auth/user-not-found":
            message = "No account found with this email address.";
            break;
          case "auth/wrong-password":
          case "auth/invalid-credential":
            message = "Incorrect email or password. Please try again.";
            break;
          case "auth/invalid-email":
            message = "Please enter a valid email address.";
            break;
          case "auth/too-many-requests":
            message =
              "Too many failed attempts. Please wait a few minutes and try again.";
            break;
          case "auth/network-request-failed":
            message = "Network error. Please check your internet connection.";
            break;
          default:
            message = err.message;
            break;
        }
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: message,
        });
      });
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const result = await googleSignIn();
      setUser(result.user);
      Swal.fire({
        icon: 'success',
        title: 'Google sign-in successful!',
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(location.state || '/');
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Google sign-in failed',
        text: err.message,
      });
    } finally {
      setLoading(false);
    }
  };


  return (
      <div className='mt-32'>
        <div className="bg-white bg-opacity-90 shadow-lg rounded-lg w-11/12 mx-auto p-10 max-w-md">
       <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          <span className="text-warning">Please</span> Log In your account
          </h1>
          <p className="mt-2 text-gray-600">Please Log in for Find job</p>
        </div>
        <form onSubmit={handleLogIn} className="flex flex-col gap-5">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered w-full"
            required
          />

          <div className="relative">
            <input
              type={show ? 'text' : 'password'}
              name="password"
              placeholder="Enter your password"
              required
              className="input input-bordered w-full pr-10"
            />
            
            <span onClick={() => setShow(!show)} className="absolute right-2 top-3 cursor-pointer z-50" > {show ? <FaEye /> : <IoEyeOff />} </span>
          
          <p className="mt-2 text-sm text-red-600">
              Forgot Password?
            </p>
          
          </div>

          <button
            type="submit"
            className="btn bg-green-800 w-full text-white font-semibold"
          >
            Log In
          </button>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="btn btn-outline w-full flex items-center justify-center gap-2"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5"
            />
            Sign in with Google
          </button>
        </form>

        <p className="mt-6 text-center text-gray-700">
          Don't have an account?{' '}
          <Link to="/register" className="text-red-600 font-semibold">
            Register
          </Link>
        </p>
      </div>
      </div>
  );
};

export default Login;