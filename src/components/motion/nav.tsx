"use client";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";

const MotionNav = ({ children }: { children: React.ReactNode }) => {
  const { scrollY } = useScroll();
  const [value, setValue] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 850) setValue(true);
    else setValue(false);
  });
  return (
    <motion.nav
      variants={{
        visible: { backgroundColor: "transparent" },
        hidden: { backgroundColor: "white" },
      }}
      animate={value ? "hidden" : "visible"}
      //   transition={{ duration: 0.35, ease: "easeInOut" }}
      className="sticky top-0 z-50 w-full text-slate-800 shadow-md backdrop-blur-md"
    >
      {children}
    </motion.nav>
  );
};

export default MotionNav;
