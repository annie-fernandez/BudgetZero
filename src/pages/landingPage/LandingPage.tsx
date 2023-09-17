import React from "react";
import styles from "./styles.module.css";
import { TopBar } from "./topBar/TopBar";
import { Button } from "@mantine/core";

const LandingPage = () => {
  return (
    <div className={styles.home}>
      <TopBar href="https://www.animaapp.com/?utm_source=figma-samples&utm_campaign=figma-lp-saas&utm_medium=figma-samples" />
      <div className={styles.header}>
        <div className={styles.group}>
          <div className={styles.screenshot} />
          <Button>Get Started</Button>
          <p className={styles.subtitle}>
            Regain control of your finances by adhering to your budgets, we
            simplify the process for you.
          </p>
          <p className={styles.title}>
            <span className={styles.span}>Keep your overspending at</span>
            <span className={styles["text-wrapper-2"]}>&nbsp;</span>
            <span className={styles["text-wrapper-3"]}>Zero</span>
          </p>
        </div>
      </div>
      <div className={styles.features}>
        <div className={styles["features-centered"]}>
          <div className={styles["features-2"]}>
            <div className={styles.feature}>
              <p className={styles.p}>
                Sign in multiple ways for secure authentication
              </p>
              <div className={styles.tile}>Security</div>
              <img
                className={styles["carbon-two-factor"]}
                alt="Carbon two factor"
                src="carbon-two-factor-authentication.svg"
              />
            </div>
            <div className={styles["feature-2"]}>
              <div className={styles["subtitle-2"]}>
                Visualize your expense journey
              </div>
              <div className={styles["tile-2"]}>Graphs and Charts</div>
              <img
                className={styles["uim-chart-pie"]}
                alt="Uim chart pie"
                src="uim-chart-pie.svg"
              />
            </div>
            <div className={styles["feature-3"]}>
              <p className={styles["subtitle-3"]}>
                Create goals and budgets with individual categories
              </p>
              <div className={styles["tile-2"]}>Create Budgets</div>
              <img
                className={styles["vscode-icons-file"]}
                alt="Vscode icons file"
                src="vscode-icons-file-type-todo.svg"
              />
            </div>
          </div>
        </div>
      </div>
      {/* <ProductImage
        className={styles["product-image-px"]}
        overlapGroupClassName={styles["product-image-1280px"]}
        property1={styles["product-image-1280px-1"]}
      /> */}
      <div className={styles.footer}>
        <div className={styles.line} />
        <div className={styles["group-2"]}>
          {/* <WalletLogo
            className={styles["wallet-logo-instance"]}
            text="About Us"
          /> */}
          <div className={styles.frame}>
            <div className={styles["wallet-2"]}>
              <div className={styles["wallet-3"]}>{""}</div>
              <div className={styles["text-wrapper-4"]}>{""}</div>
            </div>
            <img
              className={styles["contact-us"]}
              alt="Contact us"
              src="contact-us.png"
            />
            <div className={styles["cookies-policy"]}>{""}</div>
            <div className={styles["terms-of-use"]}>{""}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
