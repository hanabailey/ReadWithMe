import React from 'react';
import styles from '@/app/components/MyLibrary/myBookList.module.scss'
import { useRouter } from "next/navigation";


function MyBookList(props) {
  const bookLists = props.bookList;


  const router = useRouter();
  const routeBookDetailHandler = (isbn) => {
    router.push(`/bookDetail/${isbn}`);
  };
  return (
    <div className ={styles.mainContainer}>
      {bookLists.map((bookList, index) => (
        <img className={styles.bookImg} src={bookList.books.img} key={index} onClick={()=>routeBookDetailHandler(bookList.books.isbn)}/>
      ))}
    </div>
  );
}

export default MyBookList;
