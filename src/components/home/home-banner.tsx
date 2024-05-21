"use client";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import "./home-grid.css";
import furrniture from "~/../public/furniture.jpg";
import science from "~/../public/science.jpg";
import candy from "~/../public/candy.jpg";
import { AnimatedTooltip } from "./animated-tooltip";

import ExportedImage from "next-image-export-optimizer";
import { useEffect, useState } from "react";
import { useMemo } from "react";
import { AnimatedPresence } from "../motion/presence";
import { MotionHeading } from "../motion/heading";
import { MotionDiv } from "../motion/div";
import { MotionSpan } from "../motion/span";
const HomeBanner = () => {
  const heading = "The one stop for all your";

  const subHeading = useMemo(
    () => ["Toy Needs", "School Items", "Stationery", "Art Supplies"],
    [],
  );

  const [index, setIndex] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      let next = index + 1;
      if (next === subHeading.length) {
        next = 0;
      }
      setIndex(next);
    }, 5000);
  }, [index, setIndex, subHeading]);

  const variants = {
    hide: {
      opacity: 0,
      rotateX: -180,
      y: -200,
    },
    show: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 1,
        type: "easeInOut",
      },
    },
  };
  const textVariants = {
    initial: {
      x: -500,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.1,
      },
    },
  };
  const people = [
    {
      id: 1,
      name: "Raju Thapa",
      designation: "Great Products",
      image: "https://utfs.io/f/59f0a8f6-0006-4d06-9a99-90aaafe0e107-22v22.jpg",
    },
    {
      id: 2,
      name: "Bishnu Poudel",
      designation: "Chito Raicha Delivery",
      image:
        "https://utfs.io/f/094c7a5a-7c01-4672-b607-5e6e6064a9bb-awe9dj.jpg",
    },
    {
      id: 3,
      name: "Abhisek Pathak",
      designation: "Good Items",
      image:
        "https://utfs.io/f/690aeb4a-05fd-44f5-b503-a9c7d1277a0a-jvck3t.jpg",
    },
    {
      id: 4,
      name: "Grisha Adhikari",
      designation: "My kiddo loves it!",
      image:
        "https://utfs.io/f/202b7a95-a2d9-4226-8556-64046f4a7a16-kguy9e.jpg",
    },
  ];
  const divVariants = {
    initial: {
      y: 500,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.1,
      },
    },
  };
  const buttonVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 2,
      },
    },
  };

  return (
    <AnimatedPresence>
      <div className=" mt-8 flex w-full flex-col  gap-6 text-slate-700 md:mt-16 md:flex-row md:gap-24 lg:gap-52">
        <MotionHeading
          variants={textVariants}
          initial="initial"
          animate="animate"
          viewport={{ once: true }}
          className="
        w-full
        text-5xl font-semibold tracking-wide  lg:text-7xl "
        >
          {heading}

          <br className="" />
          <MotionSpan
            layout
            variants={variants}
            key={index}
            initial="hide"
            animate="show"
            transition={{
              duration: 3,
            }}
            className="break-keep bg-gradient-to-l from-orange-300 via-orange-400 to-orange-500 bg-clip-text text-transparent"
          >
            {subHeading[index]}
          </MotionSpan>
        </MotionHeading>
        <MotionDiv
          variants={buttonVariants}
          initial="initial"
          viewport={{ once: true }}
          animate="animate"
          className="  md:w-2/5"
        >
          <p className="mt-4 text-lg  ">
            Spark joy in learning with our playful collection of kids toys and
            school supplies
          </p>

          <Link
            href="/product"
            className="group relative mt-5 inline-flex cursor-pointer items-center justify-center
         overflow-hidden rounded-lg border-b-2 border-l-2 border-r-2 border-orange-700 bg-gradient-to-tr from-orange-600 to-orange-500 px-4 py-3 text-white shadow-lg transition duration-100 ease-in-out active:translate-y-0.5 active:border-orange-600 active:shadow-none"
          >
            <span className="absolute h-0 w-0 rounded-full bg-white opacity-10 transition-all duration-300 ease-out group-hover:h-32 group-hover:w-32"></span>
            Shop Now <ArrowRightIcon className=" ml-3 size-6" />
            <span className="relative font-medium"></span>
          </Link>
        </MotionDiv>
      </div>

      <MotionDiv
        variants={divVariants}
        initial="initial"
        animate="animate"
        className="parent mx-auto mt-8 h-96  gap-2 *:rounded-xl sm:gap-4 md:mt-16  md:w-11/12  md:*:rounded-3xl xl:h-[500px]  "
      >
        <div className="div1 col-span-8 row-span-4 flex flex-col  bg-orange-400 p-6 sm:col-span-6 sm:row-span-4 ">
          <h1
            className=" flex h-full flex-col justify-between
          font-medium text-slate-50 md:text-xl 
           md:tracking-wide lg:text-3xl"
          >
            From colorful building blocks to interactive educational toys, we
            have something for every young adventurer.
            <span className=" mt-6 flex h-full flex-row gap-6 text-lg md:flex-col  md:gap-6  lg:flex-row lg:items-end lg:gap-12  ">
              <div className=" flex h-full   items-end">
                <AnimatedTooltip items={people} />
              </div>
              <h1
                className="text-xs max-md:self-end
               
             md:text-base"
              >
                With over 1200+ <br />
                satisfied customers
              </h1>
            </span>
          </h1>
        </div>
        <div className="div2 relative  col-span-4 row-span-2 bg-blue-300 sm:col-span-3 sm:col-start-1 sm:row-span-4 sm:row-start-5 ">
          <ExportedImage
            src={science}
            alt="Science Lab Image"
            fill
            loading="eager"
            className="rounded-xl object-cover md:rounded-3xl"
          />
        </div>
        <div className="div3 relative col-span-4  row-span-4   sm:col-span-2 sm:col-start-7 sm:row-span-8 sm:row-start-1">
          <ExportedImage
            src={furrniture}
            alt="Furniture Image"
            fill
            loading="eager"
            className="rounded-xl object-cover md:rounded-3xl"
          />
        </div>
        <div className="div4 relative col-span-4 row-span-2 bg-red-800 sm:col-span-3 sm:col-start-4 sm:row-span-4 sm:row-start-5">
          <ExportedImage
            src={candy}
            alt="Candy Image "
            fill
            loading="eager"
            className="rounded-xl object-cover md:rounded-3xl"
          />
        </div>
      </MotionDiv>
    </AnimatedPresence>
  );
};

export default HomeBanner;
