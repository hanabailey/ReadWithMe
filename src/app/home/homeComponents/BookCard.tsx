import React from "react";
import Card from "@/app/components/UI/Card";
import styles from "./BookCard.module.scss";
import { useRouter } from "next/navigation";



function BooksCard(props:any) {
  const router = useRouter();

  if(!props.bookDetail){
    console.log('no data')
    return null
  }

  //유저북테이블 안불러졌던 이유 : null이 값으로 들어가 있었는데 몰랐음
  const currentReadingPage = props.bookDetail.user_books[0].reading_current_page;
  const totalBookPage = props.bookDetail.total_page;

  console.log("읽은 페이지",currentReadingPage)
  console.log("총페이지",totalBookPage)

  const currentReadingPercent = Math.floor((currentReadingPage/totalBookPage)*100)


  if(currentReadingPage===null){
      currentReadingPercent===0
  }

  //북카드 클릭시 관련 책 페이지로 랜더링 되게하기
  const id = props.bookDetail.isbn;
  console.log('책 아이디',id)

  const bookDetailHandler =()=>{
    router.push(`/bookDetail/${id}`);

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
          <button className={styles.moreButton} onClick ={bookDetailHandler}>More</button>
        </div>
      </Card>
    </>
  );
}

export default BooksCard;
