import React from "react";
import Card from "@/app/components/UI/Card";
import styles from "./BookCard.module.scss";


function BooksCard(props:any) {

  if(!props.bookDetail){
    console.log('no data')
    return null
  }

  const currentReadingPage = props.bookDetail.user_books[0].reading_current_page;
  const totalBookPage = props.bookDetail.total_page;

  console.log("읽은 페이지",currentReadingPage)
  console.log("총페이지",totalBookPage)

  const currentReadingPercent = Math.floor((currentReadingPage/totalBookPage)*100)

  if(currentReadingPage===null){
      currentReadingPercent===0
  }
  
  return (
    <>
    {console.log('북카드' ,props.bookDetail)}
      <Card>
        <div className={styles.container}>
          <div>{<img src={props.bookDetail.img} className={styles.img}/>}</div>
          <div className={styles.bookTitle}>{props.bookDetail.title}</div>
          <div className={styles.author}>{props.bookDetail.author}</div>

          {/* TODO: 여기 바차트로 다시 css 넣고 변경하기 */}
          <div className={styles.author}> {currentReadingPercent}% 읽음</div> 
        </div>
      </Card>
    </>
  );
}

export default BooksCard;
