import React, { Fragment } from "react";

import Image from "next/image";

import { BiLink } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { FiHeart, FiEye } from "react-icons/fi";

import { useModal } from "hooks";
import { Modal } from "components";

import UserName from "./UserName";
import TrendingImageWrapper from "./TrendingImageWrapper";

import styles from "./TrendingCard.module.scss";

export default function TrendingCard(props) {
  const { id, src, title, avatarUrl, displayName } = props;

  const trendingCardModal = useModal(false);

  return (
    <Fragment>
      <div className={styles.container}>
        <TrendingImageWrapper>
          <Image
            className={styles.content}
            src={src}
            alt={title}
            layout="fill"
            onClick={trendingCardModal.openModal}
          />
        </TrendingImageWrapper>

        <div className={styles.footer}>
          <div className={styles.link}>
            <BiLink />
          </div>
          <div className={styles.addtionalProperties}>
            <div>
              <FiEye />
              <span>1234</span>
            </div>
            <div>
              <FaRegComment />
              <span>23</span>
            </div>
            <div>
              <FiHeart />
              <span>234</span>
            </div>
          </div>
        </div>
      </div>

      <UserName avatarUrl={avatarUrl} displayName={displayName} />

      <Modal
        visible={trendingCardModal.open}
        close={trendingCardModal.closeModal}
        render={() => (
          <div className={styles.popupWrapper}>
            <Image
              width={"50vw"}
              height={"50vh"}
              src={src}
              className={styles.content}
              alt={title}
              layout="responsive"
            />
          </div>
        )}
      />
    </Fragment>
  );
}
