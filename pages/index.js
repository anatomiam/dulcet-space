import Head from "next/head";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();

  return (
    <div className="container">
      <Head>
        <title>Hello</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <section>
          {/* <h1 className="subtitle">Coming soon&#8230;</h1> */}

          <h1 className="title">Hey, I&apos;m Eric.</h1>
          <h2 className="subtitle">I design and build websites.</h2>
        </section>
      </main>

      <style jsx>{`
        .title {
          margin: 0;
          line-height: 1.15;
          font-size: var(--text-extra-large);
          color: var(--dark);
        }
        .subtitle {
          margin: 0;
          line-height: 1.5;
          font-size: var(--text-large);
          color: var(--medium);
        }
        @media (max-width: 600px) {
        }
      `}</style>
    </div>
  );
};

export default Index;
