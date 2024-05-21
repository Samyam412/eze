import Link from "next/link";

import { League_Gothic } from "next/font/google";

const Gothic = League_Gothic({ subsets: ["latin"] });
const navigation = {
  connect: [
    { name: "Support", href: "/support" },
    {
      name: "Twitter",
      href: "https://twitter.com",
    },
    {
      name: "Github",
      href: "https://www.youtube.com/",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/",
    },
  ],
  company: [
    { name: "Location", href: "/" },
    { name: "Pricing", href: "/" },
    {
      name: "Shree Harikul",
      href: "https://www.facebook.com/harikulmodelsecondaryschool",
    },
    { name: "Products", href: "/products" },
  ],
};

const Footer = () => {
  return (
    <footer
      aria-labelledby="footer-heading"
      className="font-inter spacer layer1 mt-16 w-full py-8 pb-2 text-white"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-2">
        <div className="flex flex-col justify-between lg:flex-row">
          <div className="space-y-8 text-3xl">
            <h1 className={` ${Gothic.className}text-2xl font-bold`}>
              <Link href={"/"}>
                Toys<strong className="text-5xl text-orange-600 ">NP</strong>
                ark
              </Link>
            </h1>
            <p className="max-w-lg text-base leading-6 text-white">
              Every Toy for Every Smile. Click, Play, Delivered. <br />
              Your One-Stop Shop for Playtime Fun.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-14 md:grid-cols-2 lg:mt-0 xl:col-span-2">
            <div className="md:mt-0">
              <h3 className="text-lg font-semibold leading-6 text-white">
                Connect
              </h3>
              <div className="mt-6 space-y-4">
                {navigation.connect.map((item) => (
                  <div key={item.name}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm leading-6 text-white hover:text-orange-400"
                    >
                      {item.name}
                    </a>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div>
                <h3 className="text-lg font-semibold leading-6 text-white">
                  Company
                </h3>
                <div className="mt-6 space-y-4">
                  {navigation.company.map((item) => (
                    <div key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-white hover:text-orange-400"
                      >
                        {item.name}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-white">
            &copy; {new Date().getFullYear()} ToysNPark. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
