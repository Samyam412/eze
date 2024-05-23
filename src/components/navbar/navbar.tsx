import Link from "next/link";
import Container from "../container";
import SearchInput from "./search-input";
import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { CircleUserRound, Loader } from "lucide-react";
import Cart from "../cart/cart";
import { CustomUserButton } from "./user-button";
import logo from "~/../public/logo.jpg";
import Image from "next/image";
import  MotionNav  from "../motion/nav";

const Navbar = () => {
  return (
    <MotionNav
    >
      <Container>
        <Link
          href="/"
          className="flex  items-center justify-between gap-3 text-sm md:gap-0 md:text-lg"
        >
          <div className="relative size-14">
            <Image src={logo} alt="Eze Logo" fill className="object-contain" />
          </div>

          <div className="flex items-center gap-4 sm:gap-8 ">
            <SearchInput />
            <ClerkLoading>
              <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
            </ClerkLoading>
            <ClerkLoaded>
              <SignedIn>
                <CustomUserButton />
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <CircleUserRound className="h-5 w-5" />
                </SignInButton>
              </SignedOut>
            </ClerkLoaded>
            <Cart />
          </div>
        </Link>
      </Container>
    </MotionNav>
  );
};

export default Navbar;
