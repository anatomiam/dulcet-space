import Head from "next/head";

const Past = (props) => {
  return (
    <div className="container">
      <Head>
        <title>Woah, hey</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <section>
          <h1 className="title">the past</h1>

          <p className="description">This has all changed accordingly</p>

          <div className="footnote">
            <p>so long, and don't forget</p>
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

export default Past;
