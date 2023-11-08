import React, { useState, useEffect } from "react";
import { Textarea } from "@mantine/core";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import styles from "@/app/bookDetail/[id]/bookDetail.module.scss";

const ShortReview = ({ bookIsbn }) => {
  const [shortReview, setShortReview] = useState("");
  const [isEditing, setIsEditing] = useState(false); 

  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchInitialShortReview = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      try {
        const { data, error } = await supabase
          .from("user_books")
          .select("short_review")
          .eq("isbn", bookIsbn)
          .eq("user_id", user.id);

        if (error) {
          console.error("Error fetching short review:", error);
        } else {
          const initialShortReview = data[0]?.short_review || "";
          setShortReview(initialShortReview);
        }
      } catch (error) {
        console.error("Error fetching short review:", error);
      }
    };

    fetchInitialShortReview();
  }, [bookIsbn]);

  const shortReviewHandler = async (newReview) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    try {
      const { data, error } = await supabase
        .from("user_books")
        .update({ short_review: newReview })
        .eq("isbn", bookIsbn)
        .eq("user_id", user.id)
        .select();

      if (error) {
        console.error("Short review update error:", error);
      } else {
        console.log("Short review updated successfully:", data);
        setShortReview(newReview); 
        setIsEditing(false); 
      }
    } catch (error) {
      console.error("Error updating short review:", error);
    }
  };

  const handleShortReviewChange = (event) => {
    setShortReview(event.target.value); 
  };

  return (
    <>
      <h3 className={styles.infoSubHeader}>Short Review</h3>

      {isEditing ? ( 
        <>
        <p>What do you think about this book? Write your short review down.</p>
          <Textarea
            placeholder="Your short review"
            label="Short review"
            radius="md"
            size="md"
            value={shortReview}
            onChange={handleShortReviewChange}
          />
          <button
            className={styles.enterButton}
            onClick={() => shortReviewHandler(shortReview)}
          >
            Enter
          </button>
        </>
      ) : shortReview ? (
        <>
          <p>{shortReview}</p>
          <button
            onClick={() => setIsEditing(true)}
            className={styles.enterButton}
          >
            Edit
          </button>{" "}
        </>
      ) : (
        <>
        <p>What do you think about this book? Write your short review down.</p>
          <Textarea
            placeholder="Your short review"
            label="Short review"
            radius="md"
            size="md"
            value={shortReview}
            onChange={handleShortReviewChange}
          />
          <button
            className={styles.enterButton}
            onClick={() => shortReviewHandler(shortReview)}
          >
            Enter
          </button>
        </>
      )}
    </>
  );
};

export default ShortReview;
