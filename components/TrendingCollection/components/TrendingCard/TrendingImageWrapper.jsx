import React from "react";

import styles from "./TrendingImageWrapper.module.scss";

export default function TrendingImageWrapper({ children }) {
  return (
    <div className={styles.box}>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
