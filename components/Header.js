import Link from "next/link";
export function Header() {
  return (
    <div>
      <nav className="navigation-menu">
        <ul>
          <li>
            <Link href="/">index</Link>
          </li>
          <li>
            <Link href="/contact">contact</Link>
          </li>
          <li>
            <Link href="/experience">experience</Link>
          </li>
          <li>
            <Link href="/projects">projects</Link>
          </li>
        </ul>
      </nav>

      <style jsx>{`
        .navigation-menu {
          line-height: 1.5;
          font-size: var(--small);
          color: var(--medium);
          position: absolute;
          left: 3rem;
          top: 2rem;
        }
        /* tablets and above breakpoint */
        @media only screen and (min-width: 768px) {
          .navigation-list {
            display: inline;
          }
        .navigation-menu {
          width: auto;
          padding-right: 0;
        }
      `}</style>
    </div>
  );
}
