"use client";

import React, { useEffect, useState } from "react";
import HomeHeader from "@/app/components/HomeHeader";
import BookCard from "./homeComponents/BookCard";
import styles from "@/app/home/home.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "@/app/components/UI/Modal";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";


interface CardsProps {
  id: number;
}

function page() {
  const [fetchError, setFetchError] = useState(null);
  const [books, setBooks] = useState<any>(null);
  const supabase = createClientComponentClient();

  useEffect(()=>{
    const fetchBooks =async () => {
      const {data,error} = await supabase
      .from("books")
      .select()



      if(error){
        setFetchError('Could not find data')
        setBooks(null)
        console.log(error)
      }

      if(data){
        console.log('데이터',data)
        setBooks(data)
        setFetchError(null)
      }
    }

    fetchBooks()

  },[])



  const [modalOpen, setModalOpen] = useState(false);

  const showModal = () => {
    setModalOpen(true);
  };

  const closeModal =()=>{
    setModalOpen(false);
  }

  return (
    <>
      <HomeHeader />
      <main className={styles.main}>
        <div className={styles.mainContainer}>


        {/* 현재 읽는 책 파트 */}
          <section className={styles.section}>
            <div className={styles.titleContainer}>
              <div className={styles.title}>Currnetly Reading</div>
              <button className={styles.button} onClick={showModal}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
              {modalOpen && <Modal setModalOpen={setModalOpen} modalClose={closeModal}/>}

            </div>
            <div className={styles.cardContainer}>
            {fetchError && <h2>{fetchError}</h2>}
            {books && books.map((book) => (
                <BookCard key={book.isbn} bookDetail={book} />
              ))}
            </div>
          </section>

          {/* 빌린책 반납일정 */}
          <section className={styles.section}>
            <div className={styles.titleContainer}>
              <div className={styles.title}>My borrowing</div>
              <button className={styles.button} onClick={showModal}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
            {modalOpen && <Modal setModalOpen={setModalOpen} />}
          </section>
        </div>

      </main>

    </>
  );
}

export default page;
