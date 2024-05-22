import React from "react";
import InfoUser from "../../components/Profile/InfoUser";

const InfoUserPage = () => {
  return (
    <div className="flex container">
      <div className="w-1/3">
        <InfoUser />
      </div>
      <div className="w-2/3 mx-32">Job</div>
    </div>
  );
};

export default InfoUserPage;
