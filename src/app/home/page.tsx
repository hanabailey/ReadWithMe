"use client";

import React, { useEffect, useState } from "react";
import HomeHeader from "@/app/components/HomeHeader";
import BookCard from "./homeComponents/BookCard";
import styles from "@/app/home/home.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import BookCardModal from "./homeComponents/BookCardModal";

interface CardsProps {
  id: number;
}

function Page(props) {
  const [fetchError, setFetchError] = useState(null);
  const [books, setBooks] = useState<any>(null);

  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchBooks = async () => {
      const { data, error } = await supabase
        .from("books")
        .select(`*, user_books(reading_current_page)`);

      if (error) {
        setFetchError("Could not find data");
        setBooks(null);
        console.log(error);
      }

      if (data) {
        console.log("데이터있음", data);
        setBooks(data);
        setFetchError(null);
      }

    //   const {
    //     data: { user },
    //   } = await supabase.auth.getUser();

    //   const { data: books } = await supabase
    //     .from("user_books")
    //     .select("reading_current_page, books(*)")
    //     .eq("user_id", user.id);

    //   console.log(books);

    //   const { data: book } = await supabase
    //     .from("books")
    //     .select("*, user_books(*)")
    //     .eq("isbn", 9791130697246)
    //     .eq("user_books.user_id", user.id)
    //     .single();
    };

    fetchBooks();
  }, []);

  const [modalOpen, setModalOpen] = useState(false);

  const showModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

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
              {modalOpen && (
                <BookCardModal
                  setIsModalOpen={setModalOpen}
                  modalClose={closeModal}
                ></BookCardModal>
              )}
            </div>
          </section>

          {/* 현재읽는책보여주는 카드들 */}
          <section className={styles.section}>
            <div className={styles.cardContainer}>
              {fetchError && <h2>{fetchError}</h2>}

              {books &&
                books.map((book) => (
                  <BookCard key={book.isbn} bookDetail={book} />
                ))}
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.titleContainer}>
              <div className={styles.title}>Book Club activities</div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default Page;
