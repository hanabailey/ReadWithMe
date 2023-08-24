"use client";

import React, { useEffect, useState } from "react";
import HomeHeader from "@/app/components/HomeHeader";
import BorrowingBooksCard from "../components/BorrowingBooksCard";
import styles from "@/app/home/home.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ModalForBorrowing from "@/app/components/ModalForBorrowing";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";


interface CardsProps {
  id: number;
}

function page() {
  const [cards, setCards] = useState<CardsProps[]>([]);
  const [fetchError, setFetchError] = useState(null);
  const [books, setBooks] = useState<any>(null);
  const supabase = createClientComponentClient();

  useEffect(()=>{
    const fetchBooks =async () => {
      const {data,error} = await supabase
      .from("books")
      .select()

      if(error){
        setFetchError('no fetch ')
        setBooks(null)
        console.log(error)
      }

      if(data){
        setBooks(data)
        setFetchError(null)
        console.log('데이터',data)
      }
    }

    fetchBooks()

  },[])

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


      <div>HI</div>
      {fetchError && (<p>{fetchError}</p>)}
      {books && (
        <div>{books.map(book=>(<p>{book.title}</p>))}</div>
      )}
    </>
  );
}

export default page;
