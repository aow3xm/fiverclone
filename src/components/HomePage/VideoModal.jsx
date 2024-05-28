import React, { useRef, useEffect } from "react";
import { Modal } from "antd";
import { Player } from "video-react";
import "video-react/dist/video-react.css";

const VideoModal = ({ isOpen, onClose, poster, src }) => {
  const playerRef = useRef(null);

  useEffect(() => {
    const player = playerRef.current;
    if (player) {
      isOpen ? player.play() : player.pause();
    }
  }, [isOpen]);

  const handlePlayerClick = (e) => {
    e.stopPropagation();
  };

  return (
    <Modal
      open={isOpen}
      footer={null}
      width="70%"
      onCancel={onClose}
      destroyOnClose
    >
      <div onClick={handlePlayerClick} className="p-5">
        <Player
          ref={playerRef}
          playsInline
          poster={poster}
          src={src}
          autoPlay
        />
      </div>
    </Modal>
  );
};

export default VideoModal;
