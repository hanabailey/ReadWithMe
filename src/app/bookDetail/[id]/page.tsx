"use client";
import React, { useState, useEffect } from "react";
import styles from "@/app/bookDetail/[id]/bookDetail.module.scss";
import HomeHeader from "@/app/components/HomeHeader";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import DivisionLine from "@/app/components/UI/DivisionLine";

//mentine
import { Rating } from "@mantine/core";
import { Select } from "@mantine/core";
import { Textarea } from "@mantine/core";
import { Switch } from "@mantine/core";

function BookDetail(props) {
  const [fetchError, setFetchError] = useState(null);
  const [books, setBooks] = useState<any>(null);
  const supabase = createClientComponentClient();
  const book_isbn = props.params.id;

  //mentine star rating
  const [value, setValue] = useState(0);

  useEffect(() => {
    const fetchBooks = async () => {
      const { data, error } = await supabase
        .from("books")
        .select(`*, user_books(*)`)
        .eq("isbn", book_isbn); //id값이랑 맞는애만 불러와
      console.log("책 isbn", book_isbn);

      if (error) {
        setFetchError("Could not find data");
        setBooks(null);
        console.log(error);
      }

      if (data) {
        console.log("데이터있음", data);
        setBooks(data[0]);
        setFetchError(null);

        //star_review 받아오기
        //아래if문에서 star_review를 체크하기 전에 user_books.length부터 체크해야함. 빈배열인지 봐야한다
        if (
          data[0].user_books.length > 0 &&
          data[0].user_books[0].star_review >= 0
        ) {
          setValue(data[0].user_books[0].star_review);
          console.log(data[0].user_books[0].star_review);
        }
      }
    };

    fetchBooks();
  }, []);

  //smallNav
  const [activeTab, setActiveTab] = useState(0);
  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <>
      <HomeHeader />

      <h1 className={styles.title}>Book Detail</h1>
      {books && (
        <>
          <div className={styles.container}>
            <div className={styles.bookDetailContainer}>
              <h1 className={styles.bookTitle}>{books.title}</h1>
              <h2 className={styles.authorTitle}>{books.author}</h2>
              <p className={styles.publisherTitle}>{books.publisher}</p>
            </div>
            <img src={books.img} className={styles.bookImg}></img>
          </div>
          <DivisionLine />

          {/* 여기서 작게 네비바로 버튼 클릭시 이동  */}

          <nav className={styles.smallNav}>
            <button
              className={activeTab === 0 ? styles.active : ""}
              onClick={() => handleTabClick(0)}
            >
              My
            </button>
            <button
              className={activeTab === 1 ? styles.active : ""}
              onClick={() => handleTabClick(1)}
            >
              Rate
            </button>
            <button
              className={activeTab === 2 ? styles.active : ""}
              onClick={() => handleTabClick(2)}
            >
              Review
            </button>
            <button
              className={activeTab === 3 ? styles.active : ""}
              onClick={() => handleTabClick(3)}
            >
              Timeline
            </button>
            <button
              className={activeTab === 4 ? styles.active : ""}
              onClick={() => handleTabClick(4)}
            >
              Details
            </button>{" "}
          
            <button
              className={activeTab === 5 ? styles.active : ""}
              onClick={() => handleTabClick(5)}
            >
              Description
            </button>
          </nav>

          <div className={styles.infoSection}>
            <h2 className={styles.infoHeader}>MY</h2>
            <Select
              label="Reading status"
              placeholder="Pick one"
              data={[
                { value: "want to read", label: "want to read" },
                { value: "reading", label: "reading" },
                { value: "done", label: "done" },
                { value: "pause", label: "pause" },
                { value: "stop", label: "stop" },
              ]}
            />

            {/* 별점 */}
            <h3 className={styles.infoSubHeader}>Rating</h3>
            <div className={styles.ratingContainer}>
              <Rating value={value} onChange={setValue} />
              {/* TODO: 별점 바꾸면 디비에도 반영되게 해라 */}
              <button
                onClick={() => setValue(0)}
                className={styles.enterButton}
              >
                reset
              </button>
            </div>

            {/* 짧은리뷰 */}
            <h3 className={styles.infoSubHeader}>Short Review</h3>
            <p>
              What do you think about this book? Write your short review down.
            </p>
            <Textarea
              placeholder="Your short review"
              label="Short review"
              radius="md"
              size="md"
            />
            <button className={styles.enterButton}>Enter</button>

            {/* 마이픽 */}
            <h3 className={styles.infoSubHeader}>My pick</h3>
            <div className={styles.recommendationContainer}>
              <p className={styles.recoMention}>Do you recommend this book?</p>
              <Switch size="lg" />
            </div>

          <DivisionLine/>

          <h2>Rate</h2>

          <DivisionLine/>

          <h2>Review</h2>
          <DivisionLine/>

{/* 언제 서재에 넣었고, 다읽은 날, 독서상태 변경되면 타임라인에 반영 */}
          <h2>Timeline</h2>
          <DivisionLine/>
          
  {/* 페이지, 출판사,ISBN, 정가, 관련링크 */}
          <h2>Book Detail</h2>
          <DivisionLine/>

          <h2>Book description</h2>

          <DivisionLine/>

          </div>

        </>
      )}
    </>
  );
}

export default BookDetail;