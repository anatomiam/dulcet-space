import { Header } from "./Header";

export function Layout(props) {
  const { children, theme } = props;
  return (
    <div className="page-layout">
      <Header />
      {children}
      <style jsx global>{`
        :root {
          --white: ${theme === "dark" ? "#fafbfc" : "#cfcdc3"};
          --light: ${theme === "dark" ? "#abc5db" : "#c7c5bc"};
          --medium: ${theme === "dark" ? "#758a9d" : "#9b6c6e"};
          --dark: ${theme === "dark" ? "#485663" : "#98817e"};
          --very-dark: ${theme === "dark" ? "#1d252b" : "#4d413f"};
          --black: ${theme === "dark" ? "#06090d" : "#5c554f"};
          --error: #CC0103;

          --text-very-small: 0.85rem;
          --text-small: 1rem;
          --text-medium: 1.5rem;
          --text-large: 2.5rem;
          --text-extra-large: 4rem;
        }
        html,
        body {
          background-color: var(--black);
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        li {
          list-style-type: none;
        }

        ul {
          margin: 0;
          padding: 0;
        }

        * {
          box-sizing: border-box;
        }
        .container {
          padding: 7rem 2rem;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .page-layout {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        /* tablets and above breakpoint */
        @media only screen and (min-width: 768px) {
          .container {
            padding: 4rem 12rem;
          }
        }

        /* laptops and above breakpoint */
        @media only screen and (min-width: 1024px) {
          .container {
            padding: 5rem 18rem;
          }
        }
      `}</style>
    </div>
  );
}
