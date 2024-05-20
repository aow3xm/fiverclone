import React from "react";
import Banner from "../../components/Title/Banner";

import { data, tags } from "./data";
import Card from "../../components/Title/Card";
const TitlePage = () => {
  return (
    <div>
      <Banner data={data} />
      <Card data={tags} />
    </div>
  );
};

export default TitlePage;
