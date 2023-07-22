"use client";

import React, { useState } from "react";
import HomeHeader from "@/app/components/HomeHeader";
import BorrowingBooksCard from "../components/BorrowingBooksCard";
import styles from "@/app/home/home.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ModalForBorrowing from "@/app/components/ModalForBorrowing";


interface CardsProps {
  id: number;
}

function page() {
  const [cards, setCards] = useState<CardsProps[]>([]);

  const addCard = () => {
    setCards([...cards, { id: cards.length + 1 }]);
  };

  const [modalOpen, setModalOpen] = useState(false);

  const showModal = () => {
    setModalOpen(true);
  };

  return (
    <>
      <HomeHeader />
      <main className={styles.main}>
        <div className={styles.mainContainer}>
          <section className={styles.section}>
            <div className={styles.titleContainer}>
              <div className={styles.title}>My borrowing</div>
              <button className={styles.button} onClick={showModal}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
            {modalOpen && <ModalForBorrowing setModalOpen={setModalOpen} />}

            <div className={styles.cardContainer}>
              <BorrowingBooksCard />
              {cards.map((card) => (
                <BorrowingBooksCard />
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.titleContainer}>
              <div className={styles.title}>Currnetly Reading</div>
              <button className={styles.button}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
            <div className={styles.cardContainer}>
              <BorrowingBooksCard />
              <BorrowingBooksCard />
            </div>
          </section>
        </div>

      </main>
    </>
  );
}

export default page;
