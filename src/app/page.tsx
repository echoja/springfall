import items from "@modules/article/items";
import Header from "@modules/layout/Header";
import type { Metadata } from "next";
import ListItem from "./ListItem";

export const metadata: Metadata = {
  title: "홈 | 봄가을",
  other: {
    "page-type": "home",
  },
};

const Home = () => {
  return (
    <>
      <Header />
      <main className="mt-12 mb-24">
        <ul role="list" className="mb-20 space-y-6">
          {items.map((item) => {
            return <ListItem item={item} key={item.title} />;
          })}
        </ul>
      </main>
    </>
  );
};

export default Home;
