import React from "react";
import SigninForm from "../../components/Auth/SigninForm";

const SignInPage = () => {
  return (
    <div className="container mx-auto flex gap-20 justify-center items-center border rounded p-5 ">
      <img src="/assets/images/signin.6f1c72291c1ec0817ded.jpg" />

      <SigninForm />
    </div>
  );
};

export default SignInPage;
