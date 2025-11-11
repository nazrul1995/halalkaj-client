import { useContext, useState } from "react";
import { AuthContext } from "../../Components/Provider/AuthContext";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";

const ForgetPassword = () => {
  const { resetPassword } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState(location.state?.email || "");

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      Swal.fire("Please enter your email address");
      return;
    }

    try {
      await resetPassword(email);
      Swal.fire({
        icon: "success",
        title: "Reset link sent!",
        text: "Check your Gmail inbox to reset your password.",
      });
    //   window.open("https://mail.google.com", "_blank");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white">
      <div className="bg-gray-100 p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Forget Password
        </h2>
        <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full"
            required
          />
          <button type="submit" className="btn btn-error text-white w-full">
            Reset Password
          </button>
        </form>
        <p
          className="text-blue-600 mt-4 text-center cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Back to Login
        </p>
      </div>
    </div>
  );
};

export default ForgetPassword;