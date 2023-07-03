import React from "react";
import Card from "./UI/Card";
import styles from "./BorrowingBooksCard.module.scss";


function BorrowingBooksCard() {
  return (
    <>
      <Card>
        <div className={styles.container}>
          <div className={styles.bookImg}>이미지</div>
          <div className={styles.title}>레버리지</div>
          <div>반납일</div>
          <div className={styles.title}>제목</div>
          <div>반납일</div>
          <div className={styles.title}>제목</div>
          <div>반납일</div>
        </div>
      </Card>
    </>
  );
}

export default BorrowingBooksCard;
