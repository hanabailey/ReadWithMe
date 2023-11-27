"use client";
import React, { useState, useEffect } from "react";
import styles from "@/app/bookDetail/[id]/bookDetail.module.scss";
import HomeHeader from "@/app/components/HomeHeader";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import DivisionLine from "@/app/components/UI/DivisionLine";
import BookInfo from "@/app/components/BookDetail/BookInfo";
import AllReviews from "@/app/components/BookDetail/AllReviews";
import Rates from "@/app/components/BookDetail/Rates";
import ReadingStatus from "@/app/components/BookDetail/ReadingStatus";
import StarReview from "@/app/components/BookDetail/StarReview";
import ShortReview from "@/app/components/BookDetail/ShortReview";
import MyPick from "@/app/components/BookDetail/MyPick";
import CurrentPageRead from "@/app/components/BookDetail/CurrentPageRead";

function BookDetail(props) {
  const [fetchError, setFetchError] = useState(null);
  const [books, setBooks] = useState<any>(null);
  const supabase = createClientComponentClient();
  const [bookDescription, setBookDescription] = useState("");

  const book_isbn = props.params.id;
  const [selectedStatus, setSelectedStatus] = useState("");

  //mentine star rating
  const [value, setValue] = useState(0);

  //슈파베이스 테이블 불러오기
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
        }
      }
    };

    fetchBooks();
  }, []);

  //네이버 API패치
  useEffect(() => {
    const fetchBookDescription = async () => {
      try {
        const response = await fetch(`/api?query=${book_isbn}`);
        const data = await response.json();
        console.log("ISBN 매치데이터", data);

        if (data.items.length > 0) {
          setBookDescription(data.items[0]);
          console.log(data.items[0]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchBookDescription();
  }, [book_isbn]);

  // 사용자가 선택한 상태가 변경될 때마다 상태 업데이트
  const statusChangeHandler = (newValue) => {
    setSelectedStatus(newValue);
  };

  //smallNav
  const [activeTab, setActiveTab] = useState(0);
  const handleTabClick = (index: number) => {
    setActiveTab(index);
   
    if(index===0){
      document.getElementById("My").scrollIntoView();
    }
    if(index===1){
      document.getElementById("Rate").scrollIntoView();
    }
    if(index===2){
      document.getElementById("Review").scrollIntoView();
    }
    // if(index===3){
    //   document.getElementById("Review").scrollIntoView();
    // }
    if(index===4){
      document.getElementById("BookDetail").scrollIntoView();
    }
    if(index===5){
      document.getElementById("Description").scrollIntoView();
    }
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
            <h2 className={styles.infoHeader} id="My">MY</h2>

            {/* 리딩상태 */}
              <ReadingStatus selectedStatus={selectedStatus} bookIsbn={book_isbn} />

            {/* 별점 */}
            <StarReview bookIsbn={book_isbn} />

            {/* 짧은리뷰 */}
            <ShortReview bookIsbn={book_isbn} />

            {/* 마이픽 */}
            <MyPick bookIsbn={book_isbn} />

            {/* 현재 읽은 페이지 */}
            {/* <CurrentPageRead bookIsbn={book_isbn} books={books}/> */}

            <DivisionLine />

            <h2 className={styles.infoHeader} id="Rate">Rate</h2>
            <Rates isbn={book_isbn} />

            <DivisionLine />

            <h2 className={styles.infoHeader} id="Review">Review</h2>
            <AllReviews isbn={book_isbn} />
            <DivisionLine />

            {/* 페이지, 출판사,ISBN, 정가, 관련링크 */}
            <h2 className={styles.infoHeader} id="BookDetail">Book Detail</h2>
            <BookInfo bookInfo={bookDescription} books={books} />

            <DivisionLine />

            <h2 className={styles.infoHeader} id="Description">Book description</h2>
            <p>{bookDescription.description}</p>

            <DivisionLine />
          </div>
        </>
      )}
    </>
  );
}

export default BookDetail;
