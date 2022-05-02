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
            className="text-xs text-slate-400"
            href="https://storyset.com/illustration/404-error/pana"
            target="_blank"
            rel="noopener noreferrer"
          >
            Illustration by Storyset
          </a>
        </p>

        <div className="my-4">
          <div className="text-center">
            <Link href="/">
              <a>앞뜰로 이동</a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page404;
