"use client";

import React, { Dispatch, FC, MouseEventHandler, PropsWithChildren, SetStateAction } from "react";
import styles from "@/app/components/UI/Modal.module.scss";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

type ModalProps = {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

const Modal: FC<PropsWithChildren<ModalProps>> = (props) => {
  // 모달창 켜지면 스크롤 안되게 만듬
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  const closeModal: MouseEventHandler = (event) => {
    console.log("close !!")
    event.stopPropagation();
    props.setIsModalOpen(false);
  };

  return (
    <>
      <div className={styles.modalContainer}>
        <div className={styles.modalBody}>
          <button className={styles.close} onClick={closeModal}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <div className={styles.modalContent}>{props.children}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
