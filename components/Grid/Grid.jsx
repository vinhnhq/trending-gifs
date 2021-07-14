import React, { Children } from "react";

import styles from "./Grid.module.scss";

export default function Grid({ children }) {
  return (
    <div className={styles.container}>
      {Children.map(children, (child, i) => {
        return <div className={styles.child}>{child}</div>;
      })}
    </div>
  );
}
