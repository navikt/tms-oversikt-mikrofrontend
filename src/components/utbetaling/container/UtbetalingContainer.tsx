import styles from "./UtbetalingContainer.module.css";
import React from "react";

interface Props {
  type: string;
  children: React.ReactNode;
}

const UtbetalingContainer = ({ type, children }: Props) => (
  <div className={styles["utbetaling"]}>
    <div className={`${styles["utbetaling-container"]} ${styles[`utbetaling-container-${type}`]}`}>
      {children}
    </div>
  </div>
);

export default UtbetalingContainer;
