"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { IoPersonCircle } from "react-icons/io5";
import {
  LogOut,
  Phone,
  Settings2Icon,
  Shield,
  ShoppingBagIcon,
} from "lucide-react";

export const CustomUserButton = () => {
  const { isLoaded, user } = useUser();
  const { signOut, openUserProfile } = useClerk();
  const router = useRouter();

  if (!isLoaded) return null;
  if (!user?.id) return null;
  const dropdownCss = ` flex items-center text-left gap-7 px-10 py-3 text-slate-800 hover:bg-slate-200
     transition-colors duration-200 ease-in-out rounded-md  cursor-pointer`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-6">
          <AvatarImage src={user?.imageUrl} alt="avatar" />
          <AvatarFallback className="bg-transparent">
            <IoPersonCircle className="h-full w-full " />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="mr-32 w-80 ">
        <DropdownMenuLabel className="flex items-center gap-1">
          <Avatar className="mx-5 size-8">
            <AvatarImage src={user?.imageUrl} alt="avatar" />
            <AvatarFallback className="bg-transparent">
              <IoPersonCircle className="h-full w-full " />
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className=" font-semibold">{user?.fullName}</h3>
            <p className="text-xs text-slate-800">{user?.username}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="">
          <DropdownMenuItem
            onClick={() => openUserProfile()}
            className={`${dropdownCss} `}
          >
            <Settings2Icon className="size-4 " />
            <span>Manage Account</span>
          </DropdownMenuItem>
          <DropdownMenuItem className={`${dropdownCss} `} onClick={()=>router.push("/orders")}>
            <ShoppingBagIcon className="size-4" />
            <span>My Orders</span>
          </DropdownMenuItem>
          <DropdownMenuItem className={`${dropdownCss} `} onClick={()=>router.push("/contact")}>
            <Phone className="size-4" />
            <span>Support</span>
          </DropdownMenuItem>
          <DropdownMenuItem className={`${dropdownCss} `} onClick={()=>router.push("/admin/dashboard")}>
            <Shield className="size-4" />
            <span>Admin</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => signOut(() => router.push("/") )}
          className={`${dropdownCss} `}
        >
          <LogOut className="size-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
