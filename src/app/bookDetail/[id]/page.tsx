"use client";
import React, { useState, useEffect } from "react";
import styles from "@/app/bookDetail/[id]/bookDetail.module.scss";
import HomeHeader from "@/app/components/HomeHeader";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import DivisionLine from "@/app/components/UI/DivisionLine";

//mentine
import { Rating } from "@mantine/core";
import { Select } from "@mantine/core";

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
            {/* 현재 상태 보고 변경가능 버튼 */}
            <button
              className={activeTab === 1 ? styles.active : ""}
              onClick={() => handleTabClick(1)}
            >
              Rate
            </button>
            {/* 별점, 추천여부 */}
            <button
              className={activeTab === 2 ? styles.active : ""}
              onClick={() => handleTabClick(2)}
            >
              Review
            </button>
            {/* 한줄리뷰, 장문의 독후감 포함 */}
            <button
              className={activeTab === 3 ? styles.active : ""}
              onClick={() => handleTabClick(3)}
            >
              Timeline
            </button>
            {/* 언제 서재에 넣었고, 다읽은 날, 독서상태 변경되면 타임라인에 반영 */}
            <button
              className={activeTab === 4 ? styles.active : ""}
              onClick={() => handleTabClick(4)}
            >
              Details
            </button>{" "}
            {/* 페이지, 출판사,ISBN, 정가, 관련링크 */}
            <button
              className={activeTab === 5 ? styles.active : ""}
              onClick={() => handleTabClick(5)}
            >
              Description
            </button>
          </nav>

          <div className={styles.infoSection}>
            <h3>MY</h3>

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

            <Rating value={value} onChange={setValue} />
            {/* TODO: 별점 바꾸면 디비에도 반영되게 해라 */}
            <button onClick={() => setValue(0)}>reset</button>
            <p>{books.user_books[0].reading_status}</p>
            <p>{books.user_books[0].is_recommend}</p>
          </div>
        </>
      )}
    </>
  );
}

export default BookDetail;
