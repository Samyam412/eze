"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "~/components/ui/button";

const SideNavbar = () => {
  const pathname = usePathname();

  return (
    <nav className="rounded-xl  bg-secondary p-4 shadow-sm">
      <div className="items- center flex flex-wrap justify-center gap-2 ">
        <Button
          asChild
          variant={pathname === "/admin/dashboard" ? "default" : "outline"}
        >
          <Link href="/admin/dashboard/">Dashboard</Link>
        </Button>
        <Button
          asChild
          variant={
            pathname === "/admin/dashboard/products" ? "default" : "outline"
          }
        >
          <Link href="/admin/dashboard/products">Products</Link>
        </Button>
        <Button
          asChild
          variant={
            pathname === "/admin/dashboard/orders" ? "default" : "outline"
          }
        >
          <Link href="/admin/dashboard/orders">Orders</Link>
        </Button>
        <Button
          asChild
          variant={
            pathname === "/admin/dashboard/categories" ? "default" : "outline"
          }
        >
          <Link href="/admin/dashboard/categories">Categories</Link>
        </Button>
        <Button
          asChild
          variant={
            pathname === "/admin/dashboard/customers" ? "default" : "outline"
          }
        >
          <Link href="/admin/dashboard/customers">Customer</Link>
        </Button>
      </div>
    </nav>
  );
};

export default SideNavbar;
