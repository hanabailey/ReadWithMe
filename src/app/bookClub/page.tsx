"use client";
import React from "react";
import styles from "@/app/bookClub/bookClub.module.scss";

//components
import HomeHeader from "../components/HomeHeader";
import DivisionLine from "../components/UI/DivisionLine";
import Buttons from "../components/BookClub/Buttons";
import BookClubCard from "../components/BookClub/BookClubCard";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState,useEffect} from "react";

const BookClub = () => {
  const [bookClub, setBookClub]=useState([])

  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchBooks = async () => {

      const {
            data: { user },
          } = await supabase.auth.getUser();
    
      const { data, error } = await supabase
        .from("book_club_users")
        .select("*, book_clubs(*)")
        .eq("user_id", user.id);
    

      if (error) {
        setBookClub(null);
        console.log(error);
      }

      if (data) {
        console.log("북클럽 데이터", data);
        setBookClub(data);
      }
    };

    fetchBooks();
  }, []);
  return (
    <>
      <HomeHeader />
      <Buttons />
      <DivisionLine />

      {/* 내가 가입한 북클럽 */}
      <div className={styles.titleContainer}>
        <h2>My Book clubs</h2>
        <button className={styles.viewAllButton}>View all</button>
      </div>

      {/* <div className={styles.CardContainer}>
      {bookClub && bookClub.map((club) => (
          <BookClubCard key={club.book_club_id} bookClub={club} />
        ))}      </div> */}
     

      <DivisionLine />
    </>
  );
};

export default BookClub;
