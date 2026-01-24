"use client";

import { useEffect } from "react";

export default function LiveIcon() {
  useEffect(() => {
    import("@dotlottie/player-component");
  }, []);

  return (
    <dotlottie-player
      src="https://lottie.host/c9760282-9432-49b1-bed0-6abda20c8053/lVcTExHumG.lottie"
      background="transparent"
      speed="1"
      loop
      autoplay
      style={{ width: "30px", height: "30px" }}
    />
  );
}
