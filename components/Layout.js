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
          --black: ${theme === "dark" ? "#06090d" : "#5c554f"};

          --text-small: 1rem;
          --text-medium: 1.5rem;
          --text-large: 4rem;
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

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        * {
          box-sizing: border-box;
        }
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
}
