import React from "react";
import loaderImage from "@/public/images/loaderImage.png";
import Image from "next/image";

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full min-h-screen z-50 bg-white p-10 flex items-center justify-center">
      <div className="relative size-24 flex items-center justify-center">
        <Image
          src={loaderImage}
          alt="loader image"
          className="size-14 object-cover animate-bounce"
        />
      </div>
    </div>
  );
};

export default Loader;
