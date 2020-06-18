function Layout(props) {
  return (
    <div className="page-layout">
      {props.children}
      <style jsx global>{`
        :root {
          --white: #fafbfc;
          --light: #abc5db;
          --medium: #758a9d;
          --dark: #485663;
          --black: #06090d;

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
      `}</style>
    </div>
  );
}

export default Layout;
