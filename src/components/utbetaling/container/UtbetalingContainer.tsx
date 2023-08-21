import React from "react";
import styles from "./UtbetalingContainer.module.css";

interface Props {
  type: string;
  children: React.ReactNode;
}

const UtbetalingContainer = ({ type, children }: Props) => (
  <div className={styles.utbetaling}>
    <div className={`${styles.container} ${styles[`container-${type}`]}`}>
      {children}
    </div>
  </div>
);

export default UtbetalingContainer;
