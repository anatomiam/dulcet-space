import Head from "next/head";
import { Layout } from "../components/Layout";
import Link from "next/link";
import Past from "./past";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  console.log(router);

  return (
    <div className="container">
      <Head>
        <title>Hey, Okay</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <section>
          <h1 className="title">dulcet.space</h1>

          <p className="description">This will all change eventually</p>

          <div className="footnote">
            <p>might not even see the light of day</p>
          </div>
        </section>
      </main>

      <style jsx>{`
        .description {
          line-height: 1.5;
          font-size: var(--text-medium);
          color: var(--medium);
        }
        .navigation-menu {
          line-height: 1.5;
          font-size: var(--small);
          color: var(--medium);
          position: absolute;
          left: 0.25rem;
          top: 0.5rem;
        }
        .title {
          margin: 0;
          line-height: 1.15;
          font-size: var(--text-large);
          color: var(--dark);
        }
        .footnote {
          line-height: 1.5;
          font-size: var(--text-small);
          color: var(--light);
        }
        @media (max-width: 600px) {
        }
      `}</style>
    </div>
  );
}
