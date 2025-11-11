import React, { useContext, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { IoEyeOff } from 'react-icons/io5';
import { AuthContext } from '../../Components/Provider/AuthContext';
import Swal from 'sweetalert2';
import { auth } from '../../Firebase/firebase.config';
import { Link } from 'react-router';

const Register = () => {
    const { createUser, updateUser, setUser, googleSignIn } = useContext(AuthContext);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');

    // Password validation rules
    const passwordValidation = {
        hasUpper: /[A-Z]/.test(password),
        hasLower: /[a-z]/.test(password),
        hasLength: password.length >= 6,
    };

    const allValid =
    passwordValidation.hasUpper &&
    passwordValidation.hasLower &&
    passwordValidation.hasLength;

const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const photo = form.photo.value.trim();
    const email = form.email.value.trim();

    if (!allValid) {
        Swal.fire({
            icon: 'warning',
            title: 'Weak password',
            text:
                'Password must contain at least one uppercase letter, one lowercase letter, and be 6+ characters long.',
        });
        return;
    }

    setLoading(true);

    createUser(email, password)
        .then(() => {
            return updateUser({
                displayName: name,
                photoURL: photo,
            });
        })
        .then(() => auth.currentUser.reload())
        .then(() => {
            setUser(auth.currentUser);

            Swal.fire({
                icon: 'success',
                title: 'Account created successfully!',
                showConfirmButton: false,
                timer: 1500,
            });

            form.reset();
            setPassword('');
        })
        .catch((err) => {
            Swal.fire({
                icon: 'error',
                title: 'Registration failed',
                text: err.message,
            });
        })
        .finally(() => {
            setLoading(false);
        });
};

const handleGoogleSignIn = () => {
    setLoading(true);

    googleSignIn()
        .then((result) => {
            setUser(result.user);
            Swal.fire({
                icon: 'success',
                title: 'Google sign-in successful!',
                showConfirmButton: false,
                timer: 1500,
            });
        })
        .catch((err) => {
            Swal.fire({
                icon: 'error',
                title: 'Google sign-in failed',
                text: err.message,
            });
        })
        .finally(() => {
            setLoading(false);
        });
};

    return (
        <div className='mt-20'>
          <div className="bg-white bg-opacity-90 shadow-lg rounded-lg p-10 max-w-md w-full mx-4">
                <h2 className="text-3xl font-semibold mb-2 text-gray-800 text-center">
                    Create an Account
                </h2>
                <p className="mb-6 text-gray-500 text-sm text-center">
                    Enter your details below to sign up
                </p>

                <form onSubmit={handleRegister} className="flex flex-col gap-5">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        className="input input-bordered w-full"
                        required
                    />
                    <input
                        type="text"
                        name="photo"
                        placeholder="Photo URL"
                        className="input input-bordered w-full"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="input input-bordered w-full"
                        required
                    />

                    {/* Password field */}
                    <div className="relative">
                        <input type={show ? "text" : "password"} name="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} required className="input input-bordered w-full bg-white/20 text-black placeholder-gray focus:outline-none focus:ring-2 focus:ring-blue-400" />
                        <span onClick={() => setShow(!show)} className="absolute right-2 top-3 cursor-pointer z-50" > {show ? <FaEye /> : <IoEyeOff />} </span>
                    </div>

                    {password.length > 0 && (
                        <div className="text-sm mt-1 space-y-1 transition-all duration-300">
                            <p className={passwordValidation.hasUpper ? 'text-green-600' : 'text-red-500'}>
                                {passwordValidation.hasUpper ? '✔' : '✖'} Must contain an uppercase letter
                            </p>
                            <p className={passwordValidation.hasLower ? 'text-green-600' : 'text-red-500'}>
                                {passwordValidation.hasLower ? '✔' : '✖'} Must contain a lowercase letter
                            </p>
                            <p className={passwordValidation.hasLength ? 'text-green-600' : 'text-red-500'}>
                                {passwordValidation.hasLength ? '✔' : '✖'} Must be at least 6 characters long
                            </p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-error w-full text-white font-semibold"
                    >
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button>

                    <button
                        onClick={handleGoogleSignIn}
                        type="button"
                        disabled={loading}
                        className="btn btn-outline w-full flex items-center justify-center gap-2"
                    >
                        <img
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            alt="Google"
                            className="w-5 h-5"
                        />
                        {loading ? 'Please wait...' : 'Sign up with Google'}
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-700">
                    Already have an account?{' '}
                    <Link to="/login" className="text-red-600 font-semibold">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;