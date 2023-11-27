import React, { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import styles from "@/app/bookDetail/[id]/bookDetail.module.scss";
import { Switch } from "@mantine/core";

const MyPick = ({ bookIsbn }) => {
  const [isRecommended, setIsRecommended] = useState(false);
  const supabase = createClientComponentClient();


  useEffect(() => {
    const fetchInitialRecommendation = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      try {
        const { data, error } = await supabase
          .from("user_books")
          .select("is_recommended")
          .eq("isbn", bookIsbn)
          .eq("user_id", user.id);

        if (error) {
          console.error("Error fetching recommendation:", error);
        } else {
          const initialRecommendation = data[0]?.is_recommended || false;
          setIsRecommended(initialRecommendation);
        }
      } catch (error) {
        console.error("Error fetching recommendation:", error);
      }
    };

    fetchInitialRecommendation();
  }, [bookIsbn]);

  const recommendationHandler = async (event) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log(event);

    try {
      const { data, error } = await supabase
        .from("user_books")
        .update({ is_recommended: event })
        .eq("isbn", bookIsbn)
        .eq("user_id", user.id)
        .select();

      if (error) {
        console.error("Recommendation update error:", error);
      } else {
        console.log("Recommendation updated successfully:", data);
        setIsRecommended(event); 
      }
    } catch (error) {
      console.error("Error updating recommendation:", error);
    }
  };

  return (
    <>
      <h3 className={styles.infoSubHeader} id="my-pick">My pick</h3>
      <div className={styles.recommendationContainer}>
        <p className={styles.recoMention}>Do you recommend this book?</p>
        <Switch
          color="rgba(209, 186, 186, 1)"
          size="lg"
          checked={isRecommended}
          onChange={(event) =>recommendationHandler(event.currentTarget.checked)}
        />
      </div>
    </>
  );
};

export default MyPick;
