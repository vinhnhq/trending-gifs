import React, { Fragment } from "react";

import { useKeypress } from "hooks";

import Portal from "./Portal";
import styles from "./Modal.module.scss";

const keys = {
  ESCAPE: "Escape",
};

export default function Modal({ visible, children, close, render }) {
  useKeypress(keys.ESCAPE, close);

  if (!visible) return null;

  return (
    <Portal>
      <Fragment>
        <div className={styles.container}>
          <div className={styles.contentWrapper}>
            <button
              type="button"
              className={styles.closeButton}
              onClick={close}
            >
              <span aria-hidden="true">&times;</span>
            </button>

            {render(children) || children}
          </div>
        </div>
        <div className={styles.backdrop} />
      </Fragment>
    </Portal>
  );
}
