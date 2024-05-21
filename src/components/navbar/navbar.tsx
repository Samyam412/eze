import Link from "next/link";
import Container from "../container";
import SearchInput from "./search-input";
import { League_Gothic } from "next/font/google";
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

const Gothic = League_Gothic({ subsets: ["latin"] });
const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/50 text-slate-800 shadow-md backdrop-blur-md">
      <div className="py-2 ">
        <Container>
          <div className="flex  items-center justify-between gap-3 text-sm md:gap-0 md:text-lg">
            <h1 className={` ${Gothic.className}text-xl font-bold`}>
              <Link href={"/"}>
                Toys<strong className="text-2xl text-orange-600 ">NP</strong>ark
              </Link>
            </h1>

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
          </div>
        </Container>
      </div>
    </nav>
  );
};

export default Navbar;
