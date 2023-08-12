"use client";

import React, { Component, useState } from "react";
import styles from "@/app/components/BookClub/Buttons.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquarePlus,
  faMagnifyingGlass,
  faUsersLine,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "../UI/Modal";

const Buttons = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const createNewClubHandler = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
 
  };

  return (
    <>
      <div className={styles.iconsContainer}>
        <div className={styles.buttonContainers}>
          <div className={styles.iconButton} onClick={createNewClubHandler}>
            <FontAwesomeIcon icon={faSquarePlus} />
          </div>
          <label className={styles.iconTitle}>Create New Club</label>
        </div>
        <div className={styles.buttonContainers}>
          <div className={styles.iconButton}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
          <label className={styles.iconTitle}>Browsing Clubs</label>
        </div>
        <div className={styles.buttonContainers}>
          <div className={styles.iconButton}>
            <FontAwesomeIcon icon={faUsersLine} />
          </div>
          <label className={styles.iconTitle}>My Book Clubs</label>
        </div>
      </div>

      
    {/* 북클럽만들기 모달 오픈 */}
    {isModalOpen && <Modal isModalOpen={isModalOpen} setIsModalOpen={closeModal}>
      <h2>Create New book club</h2>
      <p>form 넣어라</p>
    </Modal>}
      
    </>
  );
};

export default Buttons;
