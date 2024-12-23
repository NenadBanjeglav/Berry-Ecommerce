import Image from "next/image";
import React from "react";
import Container from "./Container";
import Form from "next/form";
import Link from "next/link";
import CartIcon from "./CardIcon";
import { Package, User } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import {
  ClerkLoaded,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { getUserOrders } from "@/sanity/helpers";

const Header = async () => {
  const user = await currentUser();

  let orders;

  if (user?.id) {
    orders = await getUserOrders(user.id);
  }

  return (
    <header className="w-full bg-white py-4 border-b border-b-gray-400 sticky top-0 z-50">
      <Container className="flex md:items-center items-center justify-between gap-5 flex-col md:flex-row">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={96}
            height={80}
            priority
          />
        </Link>
        <Form action="/search" className="flex-1">
          <input
            type="text"
            name="query"
            placeholder="Search for products..."
            className="w-full border-2 border-gray-200 px-4 py-2.5 rounded-md focus-visible:border-darkBlue outline-none "
          />
        </Form>
        <div className="flex items-center gap-5">
          <CartIcon />
          <ClerkLoaded>
            <SignedIn>
              <Link
                href="/orders"
                className="flex items-center text-sm gap-2 border border-gray-200 px-2 py-1 rounded-md shadow-md hover:shadow-none hoverEffect"
              >
                <Package className="text-darkBlue md:size-6 size-5" />
                <div className="flex flex-col">
                  <p className="text-xs">
                    <span className="font-semibold">
                      {orders && orders?.length > 0 ? orders?.length : 0}
                    </span>{" "}
                    orders
                  </p>
                  <p className="font-semibold hidden md:block">Orders</p>
                </div>
              </Link>
            </SignedIn>
            <SignedIn>
              <div className="flex items-center text-sm gap-2 border border-gray-200 px-2 py-1 rounded-md shadow-md hover:shadow-none hoverEffect">
                <UserButton />
                <div className="md:inline-flex flex-col hidden">
                  <p className="text-xs">Welcome Back</p>
                  <p className="font-semibold">{user?.fullName}</p>
                </div>
              </div>
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal">
                <div className="flex items-center text-sm gap-2 border border-gray-200 px-2 py-1 rounded-md shadow-md hover:shadow-none hoverEffect">
                  <User className="text-darkBlue size-6" />
                  <div className="flex flex-col">
                    <p className="text-xs">Account</p>
                    <p className="font-semibold">Login</p>
                  </div>
                </div>
              </SignInButton>
            </SignedOut>
          </ClerkLoaded>
        </div>
      </Container>
    </header>
  );
};

export default Header;
