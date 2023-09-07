'use client'

import React from "react";
import styles from "@/app/components/UI/Modal.module.scss";
import { useEffect,useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons"


function Modal(props:any) {

  // 모달창 켜지면 스크롤 안되게 만듬
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  // const closeModal = () => {
  //   props.setIsModalOpen(false);
  // };
  

  return (
    <>
      <div className={styles.modalContainer} onClick={props.modalClose}>
        <div className={styles.modalBody}>
          <button className={styles.close} onClick={props.modalClose}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <div className={styles.modalContent}>{props.children}</div>
        </div>
      </div>
    </>
  );
}

export default Modal;
