"use client";

import { motion } from "motion/react";

const ExampleComponent = () => (
  <div className="flex items-center justify-center py-20 bg-orange-200 rounded-lg shadow-lg">
    <motion.div
      className="flex items-center justify-center w-48 h-24 bg-white rounded-full cursor-pointer select-none"
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9, backgroundColor: "#f6a767" }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      CLICK!
    </motion.div>
  </div>
);

export default ExampleComponent;
