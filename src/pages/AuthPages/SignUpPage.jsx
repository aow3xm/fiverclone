import React, { useEffect } from "react";
import SignupForm from "../../components/Auth/SignupForm";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SignUpPage = () => {
  const navigate = useNavigate();
  const signupState = useSelector((state) => state.auth);

  useEffect(() => {
    if (signupState.user && !signupState.isLoading && !signupState.error) {
      navigate('/auth/signin');
    }
  }, [signupState, navigate]);
  return (
    <div className="container mx-auto flex flex-col lg:flex-row  justify-center items-center gap-10 lg:gap-20 border rounded p-5">
      <SignupForm />
      <div className="flex flex-col justify-center items-center gap-5">
        <img
          draggable={false}
          src="/assets/images/signup.bd994738c4eb8deb2801.jpg"
          alt="signup"
        />
        <p className="text-sm">
          Already have account?
          <NavLink className="text-blue-400  hover:text-blue-600 " to={"/auth/signin"}> Sign in</NavLink>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
