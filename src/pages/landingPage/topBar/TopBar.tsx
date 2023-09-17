import PropTypes from "prop-types";
import styles from "./styles.module.css";

export const TopBar = ({ href }: { href: string }) => {
  return (
    <div className={styles["top-bar"]}>
      <div className={styles["overlap-group"]}>
        <div className={styles["top-bar-px"]}>
          <a href={href} rel="noopener noreferrer" target="_blank">
            <img
              className={styles["secondary-CTA"]}
              alt="Secondary CTA"
              src="secondary-CTA-1.png"
            />
          </a>
          <div className={styles["text-wrapper"]}>Sign up</div>
        </div>
        <img
          className={styles["z-photoroom"]}
          alt="Z photoroom"
          src="z-4-photoroom-1.png"
        />
      </div>
    </div>
  );
};

TopBar.propTypes = {
  href: PropTypes.string,
};
