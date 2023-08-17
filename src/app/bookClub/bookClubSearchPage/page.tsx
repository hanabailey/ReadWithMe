'use client'
import React from "react";
import HomeHeader from "../../components/HomeHeader";
import SearchBar from "@/app/components/UI/SearchBar";
import styles from "@/app/bookClub/bookClubSearchPage/bookClubSearchig.module.scss";
import { useRouter } from "next/navigation";

const BookClubSearching = () => {
  const router = useRouter();

  const backToBookClubPageHandler =()=>{
    router.push("/bookClub");
  }
  return (
    <>
      <HomeHeader />
      <div className={styles.titleContainer}>
        <h1 className={styles.bookClubSearchTitle}>Search Book Clubs</h1>
      </div>
      <SearchBar />
    </>
  );
};

export default BookClubSearching;
