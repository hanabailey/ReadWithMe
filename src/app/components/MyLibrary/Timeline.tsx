import React from "react";
import styles from "@/app/components/MyLibrary/timeline.module.scss";
import Image from "next/image";

function Timeline(props) {
  const timelineDetails = props.detail;

  return (
    <>
      {timelineDetails.map((detail, index) => {
        const startDate = detail.reading_start_date;
        const endDate = detail.reading_end_date;
        const bookTitle = detail.books.title;
        const bookImage = detail.books.img;

        let dateAndStatus = "";
        if (startDate && endDate) {
          dateAndStatus = `${startDate} added / ${endDate} done`;
        } else if (startDate) {
          dateAndStatus = `${startDate} added`;
        } else if (endDate) {
          dateAndStatus = `${endDate} done`;
        }

        return (
          <div key={index} className={styles.itemContainer}>
            <div className={styles.date}>{dateAndStatus}</div>
            <div className={styles.bookTitle}>{bookTitle}</div>
            <div>
              <img src={bookImage} className={styles.bookImage} alt={bookTitle} />
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Timeline;
