import React, { useState, useEffect } from 'react';
import styles from '@/app/components/BookDetail/bookInfo.module.scss'


function BookInfo(props) {

  //날짜형식 바꾸기 
  // const pubDate = bookDescription.pubdate;
  // const [formattedDate, setFormattedDate] = useState('')

  // if (pubDate) {
  //   const year = parseInt(pubDate.slice(0, 4));
  //   const month = parseInt(pubDate.slice(4, 6)) - 1; // 월은 0부터 시작하므로 -1
  //   const day = parseInt(pubDate.slice(6, 8));
  
  //   setFormattedDate(`${day.toString().padStart(2, '0')}-${(month + 1).toString().padStart(2, '0')}-${year}`);
    
  // } 

  
    //버튼누르면 네이버로 넘어감
    const exploreButton =()=>{
      
      const link = props.bookInfo.link;
      if(link){
        window.open(link, '_blank');
      }
    }
 
  return (
    <>
     <p>Publisher : {props.bookInfo.publisher} </p>
          <p>ISBN : {props.books.isbn}</p>
          {/* <p>Public date : {formattedDate}</p> */}
          <p>Price : {props.bookInfo.discount} WON</p>
          <button onClick={exploreButton} className={styles.enterButton}>Explore on Naver</button>
    </>
  );
}

export default BookInfo;
