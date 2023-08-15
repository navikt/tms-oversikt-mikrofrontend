import styles from "./UtbetalingContainer.module.css";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const UtbetalingContainer = ({ children }: Props) => (
  <>
    <div className={styles["utbetaling"]}>
      <div className={styles["utbetaling-container"]}>
        {children}
      </div>
    </div>
  </>
);

export default UtbetalingContainer;
