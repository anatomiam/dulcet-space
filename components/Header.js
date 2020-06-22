import Link from "next/link";
export function Header() {
  return (
    <div>
      <nav className="navigation-menu">
        <ul className="navigation-list">
          <li>
            <Link href="/">
              <a>index</a>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <a>contact</a>
            </Link>
          </li>
          <li>
            <Link href="/experience">
              <a>experience</a>
            </Link>
          </li>
          <li>
            <Link href="/future">
              <a>future</a>
            </Link>
          </li>
        </ul>
      </nav>

      <style jsx>{`
        .navigation-list {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .navigation-menu {
          width: 100vw;
          line-height: 1.5;
          font-size: var(--small);
          color: var(--medium);
          position: absolute;
          padding-right: 3rem;
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
