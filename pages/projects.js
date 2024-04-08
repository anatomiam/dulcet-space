import Head from "next/head";
import Link from "next/link";

const Future = () => {
  return (
    <div className="container">
      <Head>
        <title>Projects</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>
          <ul className="navigation-list">
            <li>
              <Link href="/haiku">haiku</Link>
            </li>
            <li>
              <Link href="/sequencer">sequencer</Link>
            </li>
            <li>
              <Link href="/song-starter">song starter</Link>
            </li>
            {/* <li>
              <a
                href="https://play.google.com/store/apps/details?id=com.knobnotes.app"
                target="_blank"
                rel="noreferrer"
              >
                knob notes
              </a>
            </li> */}
          </ul>
        </div>
      </main>
      <style jsx>{`
        .navigation-list {
          line-height: 1.5;
          font-size: var(--text-extra-large);
          color: var(--light);
        }
      `}</style>
    </div>
  );
};

export default Future;
