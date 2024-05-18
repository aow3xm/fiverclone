import React, { useEffect } from "react";
import Banner from "../../components/Title/Banner";

import { data } from "./data";
const TitlePage = () => {
  return (
    <div>
      <Banner data={data} />
    </div>
  );
};

export default TitlePage;
