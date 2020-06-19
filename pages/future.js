import Head from "next/head";

const Future = () => {
  return (
    <div className="container">
      <Head>
        <title>Hey, where ya goin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <section>
          <h1 className="title">the future</h1>

          <p className="description">is not what it used to be</p>

          <div className="footnote">
            <p>can't you see</p>
          </div>
        </section>
      </main>
      <style jsx>{`
        .description {
          line-height: 1.5;
          font-size: var(--text-medium);
          color: var(--medium);
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
};

export default Future;
