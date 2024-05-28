import { PlayCircleFilled } from "@ant-design/icons";
import React from "react";

const PlayOverlay = (props) => {
  return (
    <div className="relative">
      <img className="w-full h-full object-cover" src={props.src} alt="" />
      <div className="absolute w-full h-full top-0 left-0 bg-black/10 hover:bg-transparent duration-300 flex justify-center items-center">
      <PlayCircleFilled className="text-6xl text-white/50" />
      </div>
    </div>
  );
};

export default PlayOverlay;
