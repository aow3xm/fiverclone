import React from "react";
import SigninForm from "../../components/Auth/SigninForm";

const SignInPage = () => {
  return (
    <div className="container mx-auto flex flex-col lg:flex-row gap-10 lg:gap-20 justify-center items-center border rounded p-5 ">
      <img
        className="order-2 lg:order-1"
        src="/assets/images/signin.6f1c72291c1ec0817ded.jpg"
      />
      <div className="order-1 lg:order-2">
        <SigninForm />
      </div>
    </div>
  );
};

export default SignInPage;
