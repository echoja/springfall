"use client";

import { motion } from "motion/react";

const ExampleComponent = () => (
  <div className="flex items-center justify-center rounded-lg bg-orange-200 py-20 shadow-lg">
    <motion.div
      className="flex h-24 w-48 cursor-pointer items-center justify-center rounded-full bg-white select-none"
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9, backgroundColor: "#f6a767" }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      CLICK!
    </motion.div>
  </div>
);

export default ExampleComponent;
