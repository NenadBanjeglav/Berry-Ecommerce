import React from "react";
import logo from "@/public/images/logo.png";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

const NoAccessToCart = () => {
  return (
    <div className="flex items-center justify-center py-12 md:py-32 bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center items-center">
            <Image
              src={logo}
              alt="logo"
              width={80}
              height={80}
              className="mb-4"
            />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Welcome Back!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-center">
            Log in to view your cart items and checkout! Don&apos;t miss out on
            your favorite products!
          </p>
          <SignInButton mode="modal">
            <Button className="w-full" size="lg">
              Sign In
            </Button>
          </SignInButton>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <p className="text-sm text-muted-foreground text-center">
            Don't have an account?
          </p>
          <SignUpButton mode="modal">
            <Button variant="outline" className="w-full" size="lg">
              Create an account
            </Button>
          </SignUpButton>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NoAccessToCart;
