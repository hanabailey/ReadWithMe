import React from 'react';
import styles from '@/app/components/MyLibrary/myBookList.module.scss'

function MyBookList(props) {
  const bookLists = props.bookList;

  return (
    <div className ={styles.mainContainer}>
      {bookLists.map((bookList, index) => (
        <img className={styles.bookImg} src={bookList.books.img} key={index} />
      ))}
    </div>
  );
}

export default MyBookList;
