import { motion } from "framer-motion";
import { NextSeo } from "next-seo";
import Image from "next/image";

const Home = () => {
  return (
    <>
      <NextSeo title="앞뜰" />
      <div className="flex items-center justify-center min-h-[70vh] gap-8 mb-8 w-full">
        <div>
          <motion.div
            animate={{ y: 20, scale: 0.97 }}
            transition={{
              repeat: Infinity,
              duration: 2,
              repeatType: "reverse",
            }}
            className="my-8 mx-auto sm:max-w-xs md:max-w-sm"
          >
            <Image
              src="/Launching-amico.svg"
              width={400}
              height={400}
              alt="Launching Illustration"
            />
          </motion.div>
          <p className="text-center font-xs">
            <a
              className="text-xs text-slate-400"
              href="https://storyset.com/illustration/launching/amico"
              target="_blank"
              rel="noopener noreferrer"
            >
              Illustration by Storyset
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
