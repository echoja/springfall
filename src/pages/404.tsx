import type { Transition } from "framer-motion";
import { motion } from "framer-motion";
import Link from "next/link";
import { NextSeo } from "next-seo";

import FaRegularShoePrints from "@modules/icons/FaRegularShoePrints";

const animate = { y: 20 };
const transition: Transition = {
  repeat: Infinity,
  duration: 2,
  repeatType: "reverse",
};

const Page404 = () => {
  return (
    <>
      <NextSeo title="404" />
      <div className="flex min-h-[70vh] flex-col justify-center">
        <motion.div
          animate={animate}
          transition={transition}
          className="w-full md:w-[70%] lg:w-[60%] mx-auto sm:max-w-xs md:max-w-sm mb-10"
        >
          <h1 className="text-xl font-semibold text-center">
            페이지를 찾을 수 없어요.
          </h1>
        </motion.div>

        <div className="my-4">
          <div className="text-center">
            <Link className="text-gray-500" href="/">
              <span className="">홈으로 이동</span>
              <FaRegularShoePrints className="pl-1.5" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page404;
