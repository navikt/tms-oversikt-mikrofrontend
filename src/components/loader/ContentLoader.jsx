import React from "react";
import { Loader } from "@navikt/ds-react";
import styles from "./ContentLoader.module.css";

const ContentLoader = () => {
  return (
    <div className={styles["content-loader"]}>
      <Loader transparent size="medium" />
    </div>
  );
};

export default ContentLoader;
