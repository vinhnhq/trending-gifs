import React from "react";

import Image from "next/image";

import styles from "./UserName.module.scss";

export default function UserName(props) {
  const { avatarUrl, displayName } = props;

  if (!avatarUrl || !displayName) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.avatarWrapper}>
        <Image
          src={avatarUrl}
          className={styles.avatar}
          alt={displayName}
          width="1em"
          height="1em"
          layout="responsive"
        />
      </div>
      <div className={styles.displayName}>{displayName}</div>
    </div>
  );
}
