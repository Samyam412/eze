import "~/styles/notfound.css";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { buttonVariants } from "~/components/ui/button";

const ErrorPage = () => {
  return (
    <div
      className="error-bg flex min-h-screen items-center   justify-center bg-cover bg-fixed bg-bottom"
      style={{
        backgroundImage:
          "url(data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cpolygon fill='%23f0b608' points='957 450 539 900 1396 900'/%3E%3Cpolygon fill='%23e6d710' points='957 450 872.9 900 1396 900'/%3E%3Cpolygon fill='%23e7af05' points='-60 900 398 662 816 900'/%3E%3Cpolygon fill='%23e7d808' points='337 900 398 662 816 900'/%3E%3Cpolygon fill='%23d8a408' points='1203 546 1552 900 876 900'/%3E%3Cpolygon fill='%23f1e213' points='1203 546 1552 900 1162 900'/%3E%3Cpolygon fill='%23f0b607' points='641 695 886 900 367 900'/%3E%3Cpolygon fill='%23e4d506' points='587 900 641 695 886 900'/%3E%3Cpolygon fill='%23eab822' points='1710 900 1401 632 1096 900'/%3E%3Cpolygon fill='%23e8da14' points='1710 900 1401 632 1365 900'/%3E%3Cpolygon fill='%23e8b008' points='1210 900 971 687 725 900'/%3E%3Cpolygon fill='%23edde14' points='943 900 1210 900 971 687'/%3E%3C/svg%3E)",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-sm-8 offset-sm-2 -mt-52 text-center text-slate-800">
            <div className="relative ">
              <h1 className="tracking-tighter-less text-shadow relative font-sans text-9xl font-bold">
                <span>4</span>
                <span>0</span>
                <span>4</span>
              </h1>
              <span className="absolute  top-0   -ml-12  font-semibold text-slate-500">
                Oops!
              </span>
            </div>
            <h5 className="-mr-10 -mt-3 font-semibold text-slate-800">
              Page not found
            </h5>
            <p className="mb-6 mt-2 text-slate-900">तपाई कता आउनु भाको?</p>
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: "link", size: "lg" }),

                " px-5 py-3 text-2xl font-medium  text-slate-900 underline underline-offset-4 hover:text-slate-500 hover:no-underline",
              )}
            >
              Got to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
