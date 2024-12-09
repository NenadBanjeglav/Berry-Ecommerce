import React from "react";
import Container from "./Container";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-lightBg text-sm">
      <Container className="py-5 flex items-center justify-between">
        <p className="text-gray-500">
          Copyright © 2024{" "}
          <span className="text-darkBlue font-semibold">BerryShop</span> all
          rights reserved
        </p>
        <Image
          src="/images/payment.png"
          width={256}
          height={80}
          alt="payment options"
          className="object-cover"
        />
      </Container>
    </footer>
  );
};

export default Footer;
