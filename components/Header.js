import Link from "next/link";
export function Header() {
  return (
    <div>
      <nav className="navigation-menu">
        <ul>
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
        .navigation-menu {
          line-height: 1.5;
          font-size: var(--small);
          color: var(--medium);
          position: absolute;
          left: 3rem;
          top: 2rem;
        }
        @media (max-width: 600px) {
        }
      `}</style>
    </div>
  );
}
