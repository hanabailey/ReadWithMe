import React from "react";
import styles from "@/app/components/MyLibrary/Statistics.module.scss";
import { object } from "prop-types";
import { DateTime } from "luxon";

const Statistics = (props) => {
  const books = props.books || [];

  //날짜관련은 luxon을 쓰는게 낫다
  const finishedBooksByMonth:{[month: number]: {date: number, image: string}[]} = {};
  books.forEach(book => {
    if (!book.reading_end_date) return;
    const readingEndDate = DateTime.fromISO(book.reading_end_date);
    if (!DateTime.now().hasSame(readingEndDate, 'year')) return;

    const month = readingEndDate.month;
    const monthRecord = finishedBooksByMonth[month] || [];
    monthRecord.push({date: readingEndDate.day, image: book.books.img});
    finishedBooksByMonth[month] = monthRecord;
  });

  console.log(finishedBooksByMonth);



  // console.log(books, "여기");


  // const endedBooks = [];
 
  // const readingEndDate = books
  //   .filter((book) => book.reading_end_date !== null)
  //   .map((book) => {
  //     const readingEndDt = DateTime.fromISO(book.reading_end_date);
  //     return {
  //       year: readingEndDt.year,
  //       month: readingEndDt.month,
  //       reading_end_date: book.reading_end_date,
  //       image: book.books.img,
  //     };
  //   });
  
  // const separatedByYear = readingEndDate.reduce((result, item) => {
  //   const year = item.year.toString();
  //   if (!result[year]) {
  //     result[year] = [];
  //   }
  //   result[year].push(item);
  //   return result;
  // }, {});
  
  // console.log(separatedByYear);

  // const separatedByYearAndMonth = {};

  // for (const year in separatedByYear) {
  //   separatedByYearAndMonth[year] = separatedByYear[year].reduce((result, item) => {
  //   const year = item.year.toString();
  //   const month = item.month.toString();
  //   if (!result[month]) {
  //     result[month] = [];
  //   }
  //    result[month].push(item);
  //   return result;
  //   }, {});
  // }


  // console.log(separatedByYearAndMonth)


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
        {finishedBooksByMonth[1]?.map(({date, image}) => {
              return <div className={styles.bookImgBox} key={image}>
                <img src={image} />
              </div>
            })}
            <p>Jan</p>
          <li className={styles.item}>
          {finishedBooksByMonth[2]?.map(({date, image}) => {
              return <div className={styles.bookImgBox} key={image}>
                <img src={image} />
              </div>
            })}
            <p>Feb</p>
          </li>
          <li className={styles.item}>
          {finishedBooksByMonth[3]?.map(({date, image}) => {
              return <div className={styles.bookImgBox} key={image}>
                <img src={image} />
              </div>
            })}
            <p>Mar</p>
          </li>
          <li className={styles.item}>
          {finishedBooksByMonth[4]?.map(({date, image}) => {
              return <div className={styles.bookImgBox} key={image}>
                <img src={image} />
              </div>
            })}
            <p>Apr</p>
          </li>
          <li className={styles.item}>
          {finishedBooksByMonth[5]?.map(({date, image}) => {
              return <div className={styles.bookImgBox} key={image}>
                <img src={image} />
              </div>
            })}
            <p>May</p>
          </li>
          <li className={styles.item}>
          {finishedBooksByMonth[6]?.map(({date, image}) => {
              return <div className={styles.bookImgBox} key={image}>
                <img src={image} />
              </div>
            })}
            <p>Jun</p>
          </li>
          <li className={styles.item}>
          {finishedBooksByMonth[7]?.map(({date, image}) => {
              return <div className={styles.bookImgBox} key={image}>
                <img src={image} />
              </div>
            })}
            <p>Jul</p>
          </li>
          <li className={styles.item}>
          {finishedBooksByMonth[8]?.map(({date, image}) => {
              return <div className={styles.bookImgBox} key={image}>
                <img src={image} />
              </div>
            })}
            <p>Aug</p>
          </li>
          <li className={styles.item}>
            {finishedBooksByMonth[9]?.map(({date, image}) => {
              return <div className={styles.bookImgBox} key={image}>
                <img src={image} />
              </div>
            })}
            <p>Sep</p>
          </li>
          <li className={styles.item}>
          {finishedBooksByMonth[10]?.map(({date, image}) => {
              return <div className={styles.bookImgBox} key={image}>
                <img src={image} />
              </div>
            })}
            <p>Oct</p>
          </li>
          <li className={styles.item}>
          {finishedBooksByMonth[11]?.map(({date, image}) => {
              return <div className={styles.bookImgBox} key={image}>
                <img src={image} />
              </div>
            })}
            <p>Nov</p>
          </li>
          <li className={styles.item}>
          {finishedBooksByMonth[12]?.map(({date, image}) => {
              return <div className={styles.bookImgBox} key={image}>
                <img src={image} />
              </div>
            })}
            <p>Dec</p>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Statistics;
