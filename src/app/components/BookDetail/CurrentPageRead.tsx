import React, { useState, useEffect } from "react";
import { Progress } from "@mantine/core";
import styles from "@/app/bookDetail/[id]/bookDetail.module.scss";
import { Slider, Input } from "@mantine/core";
import axios from "axios";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const CurrentPageRead = ({ bookIsbn, books }) => {
  const supabase = createClientComponentClient();
  const [currentReadingPage, setCurrentReadingPage] = useState();
  const bookLink = books.link;
  console.log(bookLink);
 
  const totalPage = books.total_page;
  console.log(totalPage,'total page')

//   fetch(`/book/catalog/${bookIsbn}`)
    // .then(console.log)
    // .then(res=>res.text())
    // .then((res) => res.json())
    // .then((data) => {
    //   console.log(data, "durl");
    // });

  //   const totalPage =books.total_page
  //   console.log(totalPage)

  useEffect(() => {
    async function fetchCurrentReadingPage() {
      const { data: {user} } = await supabase.auth.getUser();

      try {
        const { data, error } = await supabase
          .from("user_books")
          .select("reading_current_page")
          .eq("isbn", bookIsbn)
          .eq("user_id", user.id);

        if (error) {
          console.error("Error fetching current reading page:", error);
        } else {
          const initialCurrentPage = data[0]?.reading_current_page || 0;
          console.log(data);
          setCurrentReadingPage(initialCurrentPage);
        }
      } catch (error) {
        console.error("Error fetching current reading page:", error);
      }
    }

    fetchCurrentReadingPage();
  }, [bookIsbn, supabase]);

  const currentReadingPageHandler = async (newValue) => {
    const { data: {user} } = await supabase.auth.getUser();

    try {
      const { data, error } = await supabase
        .from("user_books")
        .update({ reading_current_page: newValue })
        .eq("isbn", bookIsbn)
        .eq("user_id", user.id)
        .select();

      if (error) {
        console.error("Current reading page update error:", error);
      } else {
        console.log("Current reading page updated successfully:", data);
        setCurrentReadingPage(newValue);
      }
    } catch (error) {
      console.error("Error updating current reading page:", error);
    }
  };

  return (
    <>
      <h3 className={styles.infoSubHeader}>Reading Progress</h3>

      <Progress
        color="rgba(164,195,178)"
        radius="xl"
        size="xl"
        value={currentReadingPage}
      />
      <div className={styles.readingPercent}>`%</div>

      <Input
        value={currentReadingPage}
        onChange={(event) => {
          const newValue = event.target.value;
          setCurrentReadingPage(newValue);
          currentReadingPageHandler(newValue);
        }}
        radius="md"
        size="md"
        type="number"
      />
    </>
  );
};

export default CurrentPageRead;
