import { Header } from "./Header";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Layout.module.css";

// TODO mix-blend-mode for theme mask
export function Layout(props) {
  const { children } = props;

  return (
    <div className={styles.pageLayout}>
      <Header />
      {children}
      <ThemeToggle />
    </div>
  );
}
