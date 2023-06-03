import Utterances from "@modules/utterances";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <article className="mb-20">{children}</article>
      <Utterances />
    </>
  );
}
