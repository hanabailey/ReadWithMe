import React from "react";
import Card from "@/app/components/UI/Card";
import styles from "./BookCard.module.scss";


function BooksCard(props:any) {

  if(!props.bookDetail){
    console.log('no data')
    return null
  }

  return (
    <>
    {console.log(props.bookDetail)}
      <Card>
        <div className={styles.container}>
          <div>{<img src={props.bookDetail.img} className={styles.img}/>}</div>
          <div className={styles.bookTitle}>{props.bookDetail.title}</div>
          <div className={styles.author}>{props.bookDetail.author}</div>
        </div>
      </Card>
    </>
  );
}

export default BooksCard;
