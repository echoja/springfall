import { motion } from "framer-motion";
import { NextSeo } from "next-seo";
import Image from "next/image";
import Link from "next/link";

const Page404 = () => {
  return (
    <>
      <NextSeo title="404" />
      <div className="flex min-h-[70vh] flex-col justify-center">
        <motion.div
          animate={{ y: 20 }}
          transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
          className="w-full md:w-[70%] lg:w-[60%] mx-auto sm:max-w-xs md:max-w-sm"
        >
          <Image
            src="/404 Error-pana.svg"
            width="400"
            height="400"
            alt="Error 404 not found Illustration"
          />
        </motion.div>
        <p className="text-center font-xs">
          <a
            className="text-xs"
            href="https://stories.freepik.com/web"
            rel="noopener noreferrer"
          >
            Illustration by Freepik Stories
          </a>
        </p>

        <div className="my-4">
          <h2 className="text-lg mb-4 font-bold text-center">404</h2>

          <div className="text-center">
            <Link href="/">
              <a className="text-lg font-bold bg-gray-300 dark:bg-teal-500">
                홈으로 가봅시다.
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page404;
