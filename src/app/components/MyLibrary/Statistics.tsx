import React from "react";
import styles from "@/app/components/MyLibrary/Statistics.module.scss";

const Statistics = (props) => {
  const books = props.books;
  console.log(books, "여기");
  const endedBooks = [];

  const reaidngEndDate = books.map((book, index) => {
    if (book.reading_end_date !== null) {
      console.log(book.reading_end_date);
      endedBooks.push(book.books.img);
      console.log(endedBooks);
    }
  });

  return (
    <>
      <div className={styles.statisticContainer}>
        <ul className={styles.axis_y}>
          <li className={styles.item}>0</li>
          <li className={styles.item}>3</li>
          <li className={styles.item}>6</li>
          <li className={styles.item}>9</li>
          <li className={styles.item}>12</li>
        </ul>

        <ul className={styles.axis_x}>
          <li className={styles.item}>
            {[1, 2, 3, 4, 5].reverse().map((content) => (
              <div className={styles.bookImgBox} key={content}>
                {content}
              </div>
            ))}
            <p>Jan</p>
          </li>
          <li className={styles.item}>
            <div className={styles.bookImgBox}>1</div>
            <div className={styles.bookImgBox}>2</div>
            <div className={styles.bookImgBox}>3</div>
            <div className={styles.bookImgBox}>4</div>
            <p>Feb</p>
          </li>
          <li className={styles.item}>
            <div className={styles.bookImgBox}>1</div>
            <div className={styles.bookImgBox}>2</div>
            <div className={styles.bookImgBox}>3</div>
            <p>Mar</p>
          </li>
          <li className={styles.item}>
            <div className={styles.bookImgBox}>1</div>
            <div className={styles.bookImgBox}>2</div>
            <div className={styles.bookImgBox}>3</div>
            <div className={styles.bookImgBox}>4</div>
            <div className={styles.bookImgBox}>5</div>
            <p>Apr</p>
          </li>
          <li className={styles.item}>
            <div className={styles.bookImgBox}>1</div>
            <div className={styles.bookImgBox}>2</div>
            <p>May</p>
          </li>
          <li className={styles.item}>
            <div className={styles.bookImgBox}>1</div>
            <div className={styles.bookImgBox}>2</div>
            <div className={styles.bookImgBox}>3</div>
            <div className={styles.bookImgBox}>4</div>
            <div className={styles.bookImgBox}>5</div>
            <p>Jun</p>
          </li>
          <li className={styles.item}>
            <div className={styles.bookImgBox}>1</div>
            <div className={styles.bookImgBox}>2</div>
            <div className={styles.bookImgBox}>3</div>
            <div className={styles.bookImgBox}>4</div>
            <div className={styles.bookImgBox}>5</div>
            <p>Jul</p>
          </li>
          <li className={styles.item}>
            <div className={styles.bookImgBox}>1</div>
            <div className={styles.bookImgBox}>2</div>
            <div className={styles.bookImgBox}>3</div>
            <div className={styles.bookImgBox}>4</div>
            <div className={styles.bookImgBox}>5</div>
            <p>Aug</p>
          </li>
          <li className={styles.item}>
            <div className={styles.bookImgBox}>1</div>
            <div className={styles.bookImgBox}>2</div>
            <div className={styles.bookImgBox}>3</div>
            <div className={styles.bookImgBox}>4</div>
            <div className={styles.bookImgBox}>5</div>
            <p>Sep</p>
          </li>
          <li className={styles.item}>
            <div className={styles.bookImgBox}>1</div>
            <div className={styles.bookImgBox}>2</div>
            <div className={styles.bookImgBox}>3</div>
            <div className={styles.bookImgBox}>4</div>
            <div className={styles.bookImgBox}>5</div>
            <p>Oct</p>
          </li>
          <li className={styles.item}>
            <div className={styles.bookImgBox}>1</div>
            <div className={styles.bookImgBox}>2</div>
            <div className={styles.bookImgBox}>3</div>
            <div className={styles.bookImgBox}>4</div>
            <div className={styles.bookImgBox}>5</div>
            <p>Nov</p>
          </li>
          <li className={styles.item}>
            <div className={styles.bookImgBox}>1</div>
            <div className={styles.bookImgBox}>2</div>
            <div className={styles.bookImgBox}>3</div>
            <div className={styles.bookImgBox}>4</div>
            <div className={styles.bookImgBox}>5</div>
            <p>Dec</p>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Statistics;
