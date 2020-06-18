import Head from "next/head";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Hey, Okay</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        <main>
          <h1 className="title">dulcet.space</h1>

          <p className="description">This will all change eventually</p>

          <div className="footnote">
            <p>might not even see the light of day</p>
          </div>
        </main>
      </div>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .title {
          margin: 0;
          line-height: 1.15;
          font-size: var(--text-large);
          color: var(--dark);
        }
        .description {
          line-height: 1.5;
          font-size: var(--text-medium);
          color: var(--medium);
        }
        .footnote {
          line-height: 1.5;
          font-size: var(--text-small);
          color: var(--light);
        }
        @media (max-width: 600px) {
        }
      `}</style>
    </Layout>
  );
}
