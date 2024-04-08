import Link from "next/link";
export function Header() {
  return (
    <div className="toc">
      <nav className="sticky">
        <ul>
          <li>
            <Link href="/">index</Link>
          </li>
          <li>
            <Link href="/resume">resume</Link>
          </li>
          {/* <li>
            <Link href="/projects">projects</Link>
          </li> */}
        </ul>
      </nav>

      <style jsx>
        {`
          .toc {
            line-height: 1.5;
            font-size: var(--small);
            color: var(--medium);
            display: relative;
          }
          .sticky {
            position: sticky;
            padding: 1.5rem 2rem;
            top: 0;
          }
        `}
      </style>
    </div>
  );
}
