import React, { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import styles from "@/app/components/BookDetail/allReviews.module.scss";
import userIcon from "../../../../public/img/userIcon.png";
import Image from "next/image";
import { Rating } from "@mantine/core";

function AllReviews({ isbn }) {
  const [reviews, setReviews] = useState([]);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from("user_books")
        .select(`user_id, short_review,star_review, users(*)`)
        .eq("isbn", isbn);
      console.log("AllReviews 컴포", data);

      if (error) {
        console.error("에러", error);
      } else {
        setReviews(data);
      }
    };

    fetchReviews();
  }, [isbn]);

  return (
    <>
      {reviews ? (
        reviews.map((review, index) => (
          <div key={index} className={styles.reviewContainer}>
            <div className={styles.userName}>
              <Image src={userIcon} alt="" width={30} height={30}></Image>
              {review.users.name}
            </div>
            <div className={styles.review}>{review.short_review}</div>
            <Rating value={review.star_review} readOnly />
          </div>
        ))
      ) : (
        <p>No reviews available.</p>
      )}
      <button className={styles.moreReviewButton}>More reviews</button>
    </>
  );
}

export default AllReviews;
