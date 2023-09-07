import React from "react";
import Card from "@/app/components/UI/Card";
import styles from "./BookCard.module.scss";


function BooksCard(props:any) {

  if(!props.bookDetail){
    console.log('no data')
    return null
  }

  console.log('현재페이지', props.currentPage)

  const currentReadingPage = props.currentPage;
  const totalBookPage = props.bookDetail.total_page;

  const curentReadingPercent= Math.floor(currentReadingPage/totalBookPage*100);

  return (
    <>
    {console.log('북카드' ,props.bookDetail)}
      <Card>
        <div className={styles.container}>
          <div>{<img src={props.bookDetail.img} className={styles.img}/>}</div>
          <div className={styles.bookTitle}>{props.bookDetail.title}</div>
          <div className={styles.author}>{props.bookDetail.author}</div>
          <div className={styles.author}> {curentReadingPercent}% 읽음</div> 
        </div>
      </Card>
    </>
  );
}

export default BooksCard;
